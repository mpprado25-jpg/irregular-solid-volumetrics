// C# — Prismatoid Obelisk Volume
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
        double a1 = 6, b1 = 4;
        double a2 = 3, b2 = 2;
        double h  = 5;

        double vol = PrismatoidObeliskVolume(a1, b1, a2, b2, h);
        Console.WriteLine($"Prismatoid Obelisk Volume = {vol:F4} m³");
    }
}