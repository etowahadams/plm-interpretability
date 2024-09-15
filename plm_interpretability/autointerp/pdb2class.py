import click
import csv
import re

def parse_dssp_file(dssp_path: str) -> dict[str, dict[str, str]]:
    """
    Parses a DSSP file returns a dictionary like
    {
        '101M': {
            'sequence': 'MVLSEGEWQL...',
            'secstr': 'HHHHHHHHHH...',
        },
        ...
    }
    where the keys are the PDB ID and the value contains the sequence and secstr
    strings for each PDB entry.
    """
    with open(dssp_path, 'r') as file:
        data = file.readlines()

    # Start with the first sequence and initialize all variables: a `reading_seq`
    # bool keeps track of whether we're reading a `sequence` line or a `secstr`
    # line, `curr_seq` and `curr_secstr` accumulate the sequence and secstr strings
    # as they are read across multiple lines.
    assert data[0].startswith('>') and data[0].strip().endswith('sequence')
    pdb_id = data[0].split(':')[0].replace(">", "")
    curr_seq, curr_secstr = '', ''
    reading_seq = True

    seqs_dict = {}
    for line in data[1:]:
        if line.startswith('>'):
            if line.strip().endswith('secstr'):
                reading_seq = False

            # Once we hit the next sequence line, the accumulated sequence and secstr
            # strings are ready to be added added to the dictionary.
            if line.strip().endswith('sequence'):
                seqs_dict[pdb_id] = {'sequence': curr_seq, 'secstr': curr_secstr}
                pdb_id = line.split(':')[0].replace(">", "")
                curr_seq, curr_secstr = '', ''
                reading_seq = True
        else:
            if reading_seq:
                curr_seq += line.strip()
            else:
                curr_secstr += line.strip()
    return seqs_dict


def get_matching_seqs(seqs_dict: dict[str, dict[str, str]], ss_patterns: list[str], max_seqs: int) -> list[dict[str, str]]:
    """
    Given the output of `parse_dssp_file` along with a list of secondary structure
    patterns, returns a list of sequences whose secstr matches those patterns, along
    with the positions at which the patterns match.

    Example:
    seqs_dict = {"foo": {"sequence": "MVLSE", "secstr": "GGHHH"}}
    ss_patterns = ['HHH']

    Returns:
    [
        {
            "pdb_id": "foo",
            "sequence": "MVLSE",
            "class": "00111"
        }
    ]
    """
    matching_rows = []
    for pdb_id, seq_info in seqs_dict.items():
        matches = []
        for pattern in ss_patterns:
            matches.extend(list(re.finditer(pattern, seq_info['secstr'])))
        if len(matches) == 0:
            continue

        matching_row = {
            'pdb_id': pdb_id,
            'sequence': seq_info["sequence"],
            'class': [0] * len(seq_info["sequence"])
        }
        for match in matches:
            for i in range(match.start(), match.end()):
                matching_row['class'][i] = 1
        matching_row['class'] = ''.join(map(str, matching_row['class']))
        matching_rows.append(matching_row)
        if len(matching_rows) == max_seqs:
            break
    return matching_rows


@click.command
@click.option('--dssp-path', type=str, required=True, help='Path to the DSSP file')
@click.option('--ss-patterns', type=str, multiple=True, required=True, help='Secondary structure patterns to match')
@click.option('--out-path', type=str, required=True, help='Path to save the output CSV file')
@click.option('--max-seqs', type=int, default=100, help='Maximum number of sequences to include in the output')
def pdb2class(dssp_path: str, ss_patterns: list[str], out_path: str, max_seqs: int):
    """
    Takes in a DSSP (https://swift.cmbi.umcn.nl/gv/dssp/index.html) file like this:

    ```
    >101M:A:sequence
    MVLSEGEWQLVLHVWAKVEADVAGHGQDILIRLFKSHPETLEKFDRVKHLKTEAEMKASEDLKKHGVTVLTALGA
    ILKKKGHHEAELKPLAQSHATKHKIPIKYLEFISEAIIHVLHSRHPGNFGADAQGAMNKALELFRKDIAAKYKEL
    GYQG
    >101M:A:secstr
        HHHHHHHHHHHHHHGGGHHHHHHHHHHHHHHH GGGGGG TTTTT  SHHHHHH HHHHHHHHHHHHHHHH
    HHTTTT  HHHHHHHHHHHHHTS   HHHHHHHHHHHHHHHHHH GGG SHHHHHHHHHHHHHHHHHHHHHHHHT
    T   
    ```

    Applies the regex to the `secstr` string notating secondary structure, and
    filters for matching sequences. Outputs a CSV with columns
    - PDB ID
    - Sequence: The amino acid sequence
    - Annotation: A binary string where 1 indicates the regex matched that position

    +----------------+----------------+----------------+
    | PDB ID         | Sequence       | Class          |
    +----------------+----------------+----------------+
    | 101M           | MVLSEGEWQL...  | 0001111110...  |
    +----------------+----------------+----------------+
    """
    click.echo(f"Processing {dssp_path}...")
    seqs_dict = parse_dssp_file(dssp_path)

    rows = get_matching_seqs(seqs_dict, ss_patterns, max_seqs)
    click.echo(f"Found {len(rows)} matching sequences. Writing to {out_path}...")

    with open(out_path, 'w') as file:
        writer = csv.DictWriter(file, fieldnames=['pdb_id', 'sequence', 'class'])
        writer.writeheader()
        for row in rows:
            writer.writerow(row)
