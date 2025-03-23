// Calculate GCD for aspect ratio
export const calculateGCD = (a, b) => {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

// Get common name for standard aspect ratios
export const getCommonName = (ratio) => {
  const commonRatios = {
    1.0: "1:1 (Square)",
    1.33: "4:3 (Standard)",
    1.375: "11:8",
    1.5: "3:2",
    1.6: "16:10",
    1.667: "5:3",
    1.778: "16:9 (HD/Widescreen)",
    1.85: "1.85:1 (Cinema)",
    2.0: "2:1",
    2.35: "2.35:1 (Cinemascope)",
    2.39: "2.39:1 (Anamorphic)"
  };
  
  // Find the closest match (within small tolerance)
  for (const [knownRatio, name] of Object.entries(commonRatios)) {
    if (Math.abs(ratio - knownRatio) < 0.05) {
      return name;
    }
  }
  
  return "Custom";
};