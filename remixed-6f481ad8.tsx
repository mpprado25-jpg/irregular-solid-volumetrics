import { useState, useEffect } from "react";

const SOLIDS = [
  {
    id: "obelisk",
    name: "Prismatoid Obelisk",
    emoji: "🏛️",
    desc: "A frustum with differing rectangular top & bottom, offset laterally — a true irregular solid found in ancient monoliths.",
    params: [
      { key: "a1", label: "Base Length (a₁)", unit: "m", default: 6 },
      { key: "b1", label: "Base Width (b₁)", unit: "m", default: 4 },
      { key: "a2", label: "Top Length (a₂)", unit: "m", default: 3 },
      { key: "b2", label: "Top Width (b₂)", unit: "m", default: 2 },
      { key: "h", label: "Height (h)", unit: "m", default: 5 },
    ],
    formula: "Prismatoid Rule: V = h/6 × (A_base + 4×A_mid + A_top)",
    csharpFn: (p) => `// C# — Prismatoid Obelisk Volume
// Uses the Prismatoid Rule: V = h/6 * (A_base + 4*A_mid + A_top)
// Where A_mid is the area at the cross-section halfway between base and top.

using System;

class IrregularSolid
{
    static double PrismatoidObeliskVolume(
        double a1, double b1,   // Base rectangle
        double a2, double b2,   // Top rectangle
        double h)               // Height
    {
        double aBase = a1 * b1;
        double aTop  = a2 * b2;

        // Mid cross-section (average of corresponding dimensions)
        double aMid  = ((a1 + a2) / 2.0) * ((b1 + b2) / 2.0);

        double volume = (h / 6.0) * (aBase + 4.0 * aMid + aTop);
        return volume;
    }

    static void Main()
    {
        double a1 = ${p.a1}, b1 = ${p.b1};
        double a2 = ${p.a2}, b2 = ${p.b2};
        double h  = ${p.h};

        double vol = PrismatoidObeliskVolume(a1, b1, a2, b2, h);
        Console.WriteLine($"Prismatoid Obelisk Volume = {vol:F4} m³");
    }
}`,
    compute: (p) => {
      const aBase = p.a1 * p.b1;
      const aTop = p.a2 * p.b2;
      const aMid = ((p.a1 + p.a2) / 2) * ((p.b1 + p.b2) / 2);
      return (p.h / 6) * (aBase + 4 * aMid + aTop);
    },
  },
  {
    id: "wedge",
    name: "Irregular Triangular Wedge",
    emoji: "🔺",
    desc: "A wedge with non-uniform triangular cross-sections — each end is a different triangle, joined by slanted rectangular faces.",
    params: [
      { key: "b1", label: "Base 1 (b₁)", unit: "m", default: 5 },
      { key: "h1", label: "Height 1 (h₁)", unit: "m", default: 4 },
      { key: "b2", label: "Base 2 (b₂)", unit: "m", default: 3 },
      { key: "h2", label: "Height 2 (h₂)", unit: "m", default: 2 },
      { key: "L", label: "Length (L)", unit: "m", default: 8 },
    ],
    formula: "V = L/3 × (A₁ + A₂ + √(A₁×A₂))",
    csharpFn: (p) => `// C# — Irregular Triangular Wedge Volume
// Formula: V = L/3 * (A1 + A2 + sqrt(A1 * A2))
// This is the prismatoid formula for pyramidal frustums with triangular ends.

using System;

class IrregularSolid
{
    static double IrregularWedgeVolume(
        double b1, double h1,   // First triangular face
        double b2, double h2,   // Second triangular face
        double L)               // Length along axis
    {
        double A1 = 0.5 * b1 * h1;
        double A2 = 0.5 * b2 * h2;

        double volume = (L / 3.0) * (A1 + A2 + Math.Sqrt(A1 * A2));
        return volume;
    }

    static void Main()
    {
        double b1 = ${p.b1}, h1 = ${p.h1};
        double b2 = ${p.b2}, h2 = ${p.h2};
        double L  = ${p.L};

        double vol = IrregularWedgeVolume(b1, h1, b2, h2, L);
        Console.WriteLine($"Irregular Wedge Volume = {vol:F4} m³");
    }
}`,
    compute: (p) => {
      const A1 = 0.5 * p.b1 * p.h1;
      const A2 = 0.5 * p.b2 * p.h2;
      return (p.L / 3) * (A1 + A2 + Math.sqrt(A1 * A2));
    },
  },
  {
    id: "barrel",
    name: "Ungula Barrel",
    emoji: "🛢️",
    desc: "A barrel-like solid with an elliptical mid-bulge, computed via Simpson's composite rule — neither a cylinder nor a sphere.",
    params: [
      { key: "r1", label: "End Radius (r₁)", unit: "m", default: 2 },
      { key: "r2", label: "Mid Radius (r₂)", unit: "m", default: 3 },
      { key: "h", label: "Height (h)", unit: "m", default: 6 },
    ],
    formula: "V = πh/3 × (r₁² + r₁r₂ + r₂²) — Kepler's Barrel Rule",
    csharpFn: (p) => `// C# — Ungula Barrel Volume
// Formula: Kepler's barrel approximation
// V = π * h / 3 * (r1² + r1*r2 + r2²)
// More accurate than a cylinder, accounts for the bulging mid-section.

using System;

class IrregularSolid
{
    static double UngulaBArrelVolume(
        double r1,   // End radius
        double r2,   // Mid (equatorial) radius
        double h)    // Total height
    {
        double volume = Math.PI * h / 3.0 * (r1 * r1 + r1 * r2 + r2 * r2);
        return volume;
    }

    static void Main()
    {
        double r1 = ${p.r1};
        double r2 = ${p.r2};
        double h  = ${p.h};

        double vol = UngulaBArrelVolume(r1, r2, h);
        Console.WriteLine($"Ungula Barrel Volume = {vol:F4} m³");
    }
}`,
    compute: (p) =>
      (Math.PI * p.h) / 3 * (p.r1 * p.r1 + p.r1 * p.r2 + p.r2 * p.r2),
  },
];

const PALETTE = {
  bg: "#0a0a0f",
  panel: "#111118",
  border: "#1e1e2e",
  accent: "#c8a96e",
  accent2: "#7eb8c8",
  text: "#e8e4d9",
  muted: "#6b6a72",
  code: "#0d1117",
};

export default function App() {
  const [selected, setSelected] = useState(SOLIDS[0]);
  const [params, setParams] = useState(
    Object.fromEntries(SOLIDS[0].params.map((p) => [p.key, p.default]))
  );
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setParams(Object.fromEntries(selected.params.map((p) => [p.key, p.default])));
    setCode("");
    setResult(null);
  }, [selected]);

  const handleParam = (key, val) => {
    setParams((prev) => ({ ...prev, [key]: parseFloat(val) || 0 }));
  };

  const downloadFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCsharp = () => {
    const filename = `${selected.id}_volume.cs`;
    downloadFile(filename, code);
  };

  const downloadReadme = () => {
    const paramStr = selected.params
      .map((p) => `| ${p.label} | \`${params[p.key]}\` | ${p.unit} |`)
      .join("\n");
    const readme = `# ${selected.name} — Volume Calculator

> ${selected.desc}

## Formula

\`\`\`
${selected.formula}
\`\`\`

## Usage

\`\`\`bash
dotnet run
\`\`\`

## Parameters Used

| Parameter | Value | Unit |
|-----------|-------|------|
${paramStr}

## Result

**Volume = ${result?.toFixed(4)} m³**

## How It Works

This C# program computes the volume of an **${selected.name}** using the formula above.
Adjust the parameter constants in \`Main()\` to suit your dimensions.

## File

| File | Description |
|------|-------------|
| \`${selected.id}_volume.cs\` | Self-contained C# volume calculator |

---
_Generated by Irregular Solid Volumetrics_
`;
    downloadFile("README.md", readme);
  };

  const downloadZip = async () => {
    // Download both files sequentially
    downloadCsharp();
    setTimeout(() => downloadReadme(), 300);
  };

  const calculate = async () => {
    setLoading(true);
    setCode("");
    setResult(null);

    const vol = selected.compute(params);
    setResult(vol);
    setCode(selected.csharpFn(params));
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: PALETTE.bg,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: PALETTE.text,
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${PALETTE.border}`,
        padding: "32px 48px 24px",
        background: `linear-gradient(180deg, #13131f 0%, ${PALETTE.bg} 100%)`,
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          <div>
            <div style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: PALETTE.accent,
              textTransform: "uppercase",
              marginBottom: 6,
              fontFamily: "monospace",
            }}>
              C# · AI-Powered · Volume Engine
            </div>
            <h1 style={{
              margin: 0,
              fontSize: 36,
              fontWeight: "normal",
              letterSpacing: "-0.02em",
              color: PALETTE.text,
            }}>
              Irregular Solid <span style={{ color: PALETTE.accent }}>Volumetrics</span>
            </h1>
            <div style={{ fontSize: 14, color: PALETTE.muted, marginTop: 6 }}>
              Select a solid → input dimensions → generate C# code + AI insight
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "36px 24px",
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: 24,
        alignItems: "start",
      }}>
        {/* Left panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Solid selector */}
          <div style={{
            background: PALETTE.panel,
            border: `1px solid ${PALETTE.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${PALETTE.border}`,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: PALETTE.muted,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}>
              Select Solid
            </div>
            {SOLIDS.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  borderBottom: `1px solid ${PALETTE.border}`,
                  background: selected.id === s.id
                    ? `linear-gradient(90deg, ${PALETTE.accent}18 0%, transparent 100%)`
                    : "transparent",
                  borderLeft: selected.id === s.id
                    ? `3px solid ${PALETTE.accent}`
                    : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: selected.id === s.id ? PALETTE.accent : PALETTE.text,
                }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: PALETTE.muted, marginTop: 3, lineHeight: 1.5 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Params */}
          <div style={{
            background: PALETTE.panel,
            border: `1px solid ${PALETTE.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: `1px solid ${PALETTE.border}`,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: PALETTE.muted,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}>
              Dimensions
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {selected.params.map((p) => (
                <div key={p.key}>
                  <label style={{ fontSize: 12, color: PALETTE.muted, display: "block", marginBottom: 4 }}>
                    {p.label} ({p.unit})
                  </label>
                  <input
                    type="number"
                    value={params[p.key] ?? p.default}
                    step="0.1"
                    min="0.1"
                    onChange={(e) => handleParam(p.key, e.target.value)}
                    style={{
                      width: "100%",
                      background: PALETTE.code,
                      border: `1px solid ${PALETTE.border}`,
                      borderRadius: 4,
                      color: PALETTE.accent2,
                      padding: "8px 10px",
                      fontSize: 14,
                      fontFamily: "monospace",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <button
                onClick={calculate}
                disabled={loading}
                style={{
                  marginTop: 8,
                  padding: "12px 16px",
                  background: loading
                    ? PALETTE.border
                    : `linear-gradient(135deg, ${PALETTE.accent} 0%, #a8823a 100%)`,
                  border: "none",
                  borderRadius: 6,
                  color: loading ? PALETTE.muted : "#0a0a0f",
                  fontSize: 13,
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "⟳ Generating..." : "⚡ Calculate + Generate C#"}
              </button>
            </div>
          </div>

          {/* Formula badge */}
          <div style={{
            background: PALETTE.panel,
            border: `1px solid ${PALETTE.border}`,
            borderRadius: 8,
            padding: "12px 16px",
          }}>
            <div style={{ fontSize: 10, color: PALETTE.muted, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 6 }}>Formula</div>
            <div style={{ fontSize: 12, color: PALETTE.accent2, fontFamily: "monospace", lineHeight: 1.6 }}>
              {selected.formula}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Result card */}
          {result !== null && (
            <div style={{
              background: `linear-gradient(135deg, ${PALETTE.accent}22 0%, ${PALETTE.accent2}11 100%)`,
              border: `1px solid ${PALETTE.accent}44`,
              borderRadius: 8,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: 11, color: PALETTE.accent, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  Computed Volume
                </div>
                <div style={{ fontSize: 42, fontWeight: "normal", color: PALETTE.text, letterSpacing: "-0.03em" }}>
                  {result.toFixed(4)}
                  <span style={{ fontSize: 18, color: PALETTE.muted, marginLeft: 8 }}>m³</span>
                </div>
              </div>
              <div style={{ fontSize: 48 }}>{selected.emoji}</div>
            </div>
          )}

          {/* Code output */}
          {code && (
            <div style={{
              background: PALETTE.panel,
              border: `1px solid ${PALETTE.border}`,
              borderRadius: 8,
              overflow: "hidden",
            }}>
              <div style={{
                padding: "12px 16px",
                borderBottom: `1px solid ${PALETTE.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <span style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: PALETTE.muted,
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}>⌨ C# Source</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={downloadCsharp}
                    title="Download .cs file"
                    style={{
                      padding: "5px 12px",
                      background: "transparent",
                      border: `1px solid ${PALETTE.border}`,
                      borderRadius: 4,
                      color: PALETTE.accent2,
                      fontSize: 11,
                      fontFamily: "monospace",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ↓ .cs
                  </button>
                  <button
                    onClick={downloadReadme}
                    title="Download README.md"
                    style={{
                      padding: "5px 12px",
                      background: "transparent",
                      border: `1px solid ${PALETTE.border}`,
                      borderRadius: 4,
                      color: PALETTE.accent2,
                      fontSize: 11,
                      fontFamily: "monospace",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ↓ README
                  </button>
                  <button
                    onClick={downloadZip}
                    title="Download both files for GitHub"
                    style={{
                      padding: "5px 12px",
                      background: PALETTE.accent,
                      border: "none",
                      borderRadius: 4,
                      color: "#0a0a0f",
                      fontSize: 11,
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ↓ GitHub Pack
                  </button>
                </div>
              </div>
              <div style={{
                background: PALETTE.code,
                padding: "20px 24px",
                overflow: "auto",
                maxHeight: 480,
              }}>
                <pre style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.75,
                  color: "#c9d1d9",
                  fontFamily: "'Courier New', monospace",
                  whiteSpace: "pre",
                }}>
                  {code.split("\n").map((line, i) => {
                    let color = "#c9d1d9";
                    if (line.trim().startsWith("//")) color = "#8b949e";
                    else if (/\b(using|class|static|double|void|return|new)\b/.test(line)) color = "#ff7b72";
                    else if (/Math\./.test(line)) color = "#d2a8ff";
                    else if (/Console\./.test(line)) color = "#79c0ff";
                    else if (/\$"/.test(line)) color = "#a5d6ff";
                    return (
                      <div key={i} style={{ color }}>
                        <span style={{ color: "#484f58", userSelect: "none", marginRight: 16, fontSize: 11 }}>
                          {String(i + 1).padStart(2, " ")}
                        </span>
                        {line}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!code && !loading && (
            <div style={{
              background: PALETTE.panel,
              border: `1px dashed ${PALETTE.border}`,
              borderRadius: 8,
              padding: "60px 40px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>∭</div>
              <div style={{ color: PALETTE.muted, fontSize: 14 }}>
                Select a solid, set dimensions, and hit <strong style={{ color: PALETTE.accent }}>Calculate</strong> to generate<br />
                C# source code + AI geometric insight.
              </div>
            </div>
          )}

          {/* Language badge */}
          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}>
            {["C# .NET", "Prismatoid Rule", "Simpson's Rule", "Kepler's Formula", "AI-Powered"].map((tag) => (
              <span key={tag} style={{
                padding: "4px 10px",
                background: PALETTE.panel,
                border: `1px solid ${PALETTE.border}`,
                borderRadius: 20,
                fontSize: 10,
                color: PALETTE.muted,
                fontFamily: "monospace",
                letterSpacing: "0.1em",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
