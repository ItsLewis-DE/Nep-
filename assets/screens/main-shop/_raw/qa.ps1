$ErrorActionPreference = 'Stop'
$assetDirectory = Split-Path -Parent $PSScriptRoot
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
public static class MainShopQA {
  static void Require(bool ok,string message){if(!ok)throw new Exception(message);}
  public static void Check(string path,int w,int h,int limit,bool transparent,string kind){
    using(var b=new Bitmap(path)){
      Require(b.Width==w&&b.Height==h,"Invalid dimensions: "+path);
      var colors=new HashSet<int>();int alpha=0;
      for(int y=0;y<h;y++)for(int x=0;x<w;x++){Color c=b.GetPixel(x,y);colors.Add(c.ToArgb());if(c.A==0)alpha++;}
      Require(colors.Count<=limit,"Palette overflow: "+path);
      Require(transparent?alpha>0:alpha==0,"Invalid transparency: "+path);
      if(kind=="bar")for(int y=0;y<h;y++)for(int x=16;x<w-16;x++)Require(b.GetPixel(x,y)==b.GetPixel(16,y),"HUD middle strip is not repeatable");
      if(kind=="frame"){
        for(int y=12;y<h-12;y++)for(int x=12;x<w-12;x++)Require(b.GetPixel(x,y).ToArgb()==ColorTranslator.FromHtml("#FFF1DF").ToArgb(),"Frame center is not flat cream");
        for(int y=0;y<12;y++)for(int x=12;x<w-12;x++){
          Require(b.GetPixel(x,y)==b.GetPixel(12,y),"Frame top edge not repeatable");
          Require(b.GetPixel(x,h-1-y)==b.GetPixel(12,h-1-y),"Frame bottom edge not repeatable");
        }
        for(int x=0;x<12;x++)for(int y=12;y<h-12;y++){
          Require(b.GetPixel(x,y)==b.GetPixel(x,12),"Frame left edge not repeatable");
          Require(b.GetPixel(w-1-x,y)==b.GetPixel(w-1-x,12),"Frame right edge not repeatable");
        }
      }
      Console.WriteLine(System.IO.Path.GetFileName(path)+": PASS (dimensions, palette, alpha, slice invariants)");
    }
  }
  static Bitmap Slice(Bitmap b,int w,int h,int capX,int capY){
    var dst=new Bitmap(w,h,PixelFormat.Format32bppArgb);
    for(int y=0;y<h;y++)for(int x=0;x<w;x++){
      int sx=x<capX?x:x>=w-capX?b.Width-(w-x):capX+(x-capX)%(b.Width-2*capX);
      int sy=capY==0?y:y<capY?y:y>=h-capY?b.Height-(h-y):capY+(y-capY)%(b.Height-2*capY);
      dst.SetPixel(x,y,b.GetPixel(sx,sy));
    }
    return dst;
  }
  static Bitmap Zoom(Bitmap b,int scale){
    var dst=new Bitmap(b.Width*scale,b.Height*scale);
    for(int y=0;y<dst.Height;y++)for(int x=0;x<dst.Width;x++)dst.SetPixel(x,y,b.GetPixel(x/scale,y/scale));
    return dst;
  }
  public static void Preview(string dir){
    using(var result=new Bitmap(1184,850))using(var g=Graphics.FromImage(result))using(var font=new Font("Segoe UI",12)){
      g.Clear(ColorTranslator.FromHtml("#FFF1DF"));
      Action<string,int,int> label=(s,x,y)=>g.DrawString(s,font,Brushes.Black,x,y);
      label("Landscape 800 x 500",16,8);label("Portrait 320 x 480",848,8);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"background--landscape.png")))g.DrawImageUnscaled(b,16,36);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"background--portrait.png")))g.DrawImageUnscaled(b,848,36);
      label("3-slice HUD stretched to 784 x 40 (16 px caps)",16,546);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"ui-hud--3slice.png")))using(var stretched=Slice(b,784,40,16,0))g.DrawImageUnscaled(stretched,16,574);
      label("9-slice card stretched to 400 x 176 (12 px borders)",16,624);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"action-card-frame--9slice.png")))using(var stretched=Slice(b,400,176,12,12))g.DrawImageUnscaled(stretched,16,654);
      label("Frame x3",480,624);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"action-card-frame--9slice.png")))using(var large=Zoom(b,3))g.DrawImageUnscaled(large,480,654);
      label("Glow x3 / over landscape",848,528);
      using(var bg=new Bitmap(System.IO.Path.Combine(dir,"background--landscape.png")))g.DrawImage(bg,new Rectangle(848,556,320,288),new Rectangle(304,100,192,173),GraphicsUnit.Pixel);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"door-entrance-glow.png")))using(var large=Zoom(b,3))g.DrawImageUnscaled(large,912,556);
      result.Save(System.IO.Path.Combine(dir,"_raw","preview.png"),ImageFormat.Png);
    }
  }
}
'@
[MainShopQA]::Check((Join-Path $assetDirectory 'background--landscape.png'),800,500,32,$false,'background')
[MainShopQA]::Check((Join-Path $assetDirectory 'background--portrait.png'),320,480,32,$false,'background')
[MainShopQA]::Check((Join-Path $assetDirectory 'ui-hud--3slice.png'),120,40,16,$true,'bar')
[MainShopQA]::Check((Join-Path $assetDirectory 'action-card-frame--9slice.png'),64,64,16,$true,'frame')
[MainShopQA]::Check((Join-Path $assetDirectory 'door-entrance-glow.png'),64,96,16,$true,'vfx')
[MainShopQA]::Preview($assetDirectory)
