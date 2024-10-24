export const SAE_CONFIGS: {
  [key: string]: {
    baseUrl: string;
    numHiddenDims: number;
    curated?: { name: string; dim: number; desc: string }[];
    defaultDim: number;
    supportsCustomSequence?: boolean;
  };
} = {
  "4096-dim SAE on ESM2-650M Layer 24": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l24_sae4096_100Kseqs/",
    numHiddenDims: 4096,
    curated: [
      {
        name: "free alpha helices",
        dim: 2293,
        desc: "Activates on every fourth amino acid in free alpha helices",
      },
      {
        name: "long alpha helices",
        dim: 1008,
        desc: "Activates on most amino acids in long alpha helices",
      },
      {
        name: "alpha helix turn",
        dim: 56,
        desc: "Activates on the turn between two alpha helices in ABC transporter proteins",
      },
      {
        name: "single beta sheet",
        dim: 1299,
        desc: "Activates on a single beta sheet",
      },
      {
        name: "beta sheet: first aa",
        dim: 782,
        desc: "Activates on the first amino acid in beta sheets",
      },
      {
        name: "beta helix",
        dim: 250,
        desc: "Activates on short beta strands in beta helices",
      },
      {
        name: "disordered",
        dim: 2763,
        desc: "Activates on disordered regions containing K, A, and P residues",
      },
      {
        name: "leucine rich repeats",
        dim: 3425,
        desc: "Activates on the amino acid before the start of a beta sheet in a leucine rich repeat",
      },
      {
        name: "start M",
        dim: 600,
        desc: "Activates on the M amino acid at the start of a sequence",
      },
      {
        name: "second residue",
        dim: 3728,
        desc: "Mostly activates on the second amino acid in a sequence",
      },
      { name: "alanine", dim: 3267, desc: "Activates on alanine residues" },
      {
        name: "aspartic acid",
        dim: 2830,
        desc: "Activates on aspartic acid residues",
      },
      {
        name: "glutamic acid",
        dim: 2152,
        desc: "Activates on glutamic acid residues",
      },
      {
        name: "phenylalanine",
        dim: 252,
        desc: "Activates on phenylalanine residues",
      },
      {
        name: "aspartic acid",
        dim: 3830,
        desc: "Activates on aspartic acid residues",
      },
      { name: "histidine", dim: 743, desc: "Activates on histidine residues" },
      {
        name: "isoleucine",
        dim: 3978,
        desc: "Activates on isoleucine residues",
      },
      { name: "lysine", dim: 3073, desc: "Activates on lysine residues" },
      { name: "leucine", dim: 1497, desc: "Activates on leucine residues" },
      {
        name: "methionine",
        dim: 444,
        desc: "Activates on methionine residues",
      },
      { name: "asparagine", dim: 21, desc: "Activates on asparagine residues" },
      { name: "proline", dim: 1386, desc: "Activates on proline residues" },
      { name: "glutamine", dim: 1266, desc: "Activates on glutamine residues" },
      { name: "arginine", dim: 3569, desc: "Activates on arginine residues" },
      { name: "serine", dim: 1473, desc: "Activates on serine residues" },
      { name: "threonine", dim: 220, desc: "Activates on threonine residues" },
      { name: "valine", dim: 3383, desc: "Activates on valine residues" },
      {
        name: "tryptophan",
        dim: 2685,
        desc: "Activates on tryptophan residues",
      },
      { name: "tyrosine", dim: 3481, desc: "Activates on tyrosine residues" },
    ],
    defaultDim: 2293,
    supportsCustomSequence: true,
  },
  "16384-dim SAE on ESM2-650M Layer 5": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l5_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 10": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l10_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 15": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l15_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 20": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l20_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 25": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l25_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 30": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l20_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
  "16384-dim SAE on ESM2-650M Layer 33": {
    baseUrl:
      "https://raw.githubusercontent.com/liambai/plm-interp-viz-data/refs/heads/main/esm2_plm1280_l20_sae16384_1Mseqs/",
    numHiddenDims: 16384,
    defaultDim: 0,
  },
};
