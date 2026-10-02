param([switch]$VerifyOnly, [switch]$Overwrite)
$ErrorActionPreference = 'Stop'
$assetDirectory = Split-Path -Parent $PSScriptRoot
Add-Type -AssemblyName System.Drawing
if (-not ('StudioImages' -as [type])) {
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using System.Linq;
public static class StudioImages {
  class Sample { public Color C; public int N; }
  static int Channel(Color c,int i){return i==0?c.R:i==1?c.G:c.B;}
  static Color[] Palette(Bitmap b,int limit){
    var hist=new Dictionary<int,Sample>();
    for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){
      Color c=b.GetPixel(x,y);if(c.A==0)continue;
      int key=((c.R>>3)<<10)|((c.G>>3)<<5)|(c.B>>3);
      if(!hist.ContainsKey(key))hist[key]=new Sample{C=c,N=0};hist[key].N++;
    }
    var boxes=new List<List<Sample>>{hist.Values.ToList()};
    while(boxes.Count<limit){
      int bi=-1,ci=0;double best=-1;
      for(int i=0;i<boxes.Count;i++){
        if(boxes[i].Count<2)continue;
        int total=boxes[i].Sum(s=>s.N);
        for(int j=0;j<3;j++){
          int range=boxes[i].Max(s=>Channel(s.C,j))-boxes[i].Min(s=>Channel(s.C,j));
          double score=range*Math.Sqrt(total);
          if(score>best){best=score;bi=i;ci=j;}
        }
      }
      if(bi<0||best<=0)break;
      var sorted=boxes[bi].OrderBy(s=>Channel(s.C,ci)).ToList();
      int half=sorted.Sum(s=>s.N)/2,acc=0,split=1;
      for(int i=0;i<sorted.Count-1;i++){acc+=sorted[i].N;split=i+1;if(acc>=half)break;}
      boxes[bi]=sorted.Take(split).ToList();boxes.Add(sorted.Skip(split).ToList());
    }
    return boxes.Select(box=>{
      long n=box.Sum(s=>(long)s.N);
      return Color.FromArgb(255,(int)(box.Sum(s=>(long)s.C.R*s.N)/n),(int)(box.Sum(s=>(long)s.C.G*s.N)/n),(int)(box.Sum(s=>(long)s.C.B*s.N)/n));
    }).ToArray();
  }
  static void Quantize(Bitmap b,Color[] palette){
    var cache=new Dictionary<int,Color>();
    for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){
      Color c=b.GetPixel(x,y);if(c.A==0){b.SetPixel(x,y,Color.FromArgb(0,0,0,0));continue;}
      Color mapped;
      if(!cache.TryGetValue(c.ToArgb(),out mapped)){
        double best=double.MaxValue;mapped=palette[0];
        foreach(Color p in palette){
          double rr=c.R-p.R,gg=c.G-p.G,bb=c.B-p.B,d=rr*rr+gg*gg+bb*bb;
          if(d<best){best=d;mapped=p;}
        }
        cache[c.ToArgb()]=mapped;
      }
      b.SetPixel(x,y,mapped);
    }
  }
  static Color[] UIPalette(){
    return new[]{"#1C1614","#2E1C12","#3D261A","#6B4423","#1E2A38","#2D3E50","#8B261E","#B83A24","#B58A42","#CFA449","#E8D399","#F5EFEB","#FDEACE","#FDE5C8","#F3C098"}.Select(s=>ColorTranslator.FromHtml(s)).ToArray();
  }
  public static void Normalize(string input,string output,int w,int h,int capX,int capY){
    using(var src=new Bitmap(input))using(var b=new Bitmap(w,h,PixelFormat.Format32bppArgb)){
      int left=0,top=0,sw=src.Width,sh=src.Height;
      if(capX==0){
        double target=(double)w/h;
        if((double)sw/sh>target){sw=(int)Math.Round(sh*target);left=(src.Width-sw)/2;}
        else{sh=(int)Math.Round(sw/target);top=(src.Height-sh)/2;}
      }else{
        int minX=sw,minY=sh,maxX=-1,maxY=-1;
        for(int y=0;y<sh;y++)for(int x=0;x<sw;x++)if(src.GetPixel(x,y).A>=128){minX=Math.Min(minX,x);minY=Math.Min(minY,y);maxX=Math.Max(maxX,x);maxY=Math.Max(maxY,y);}
        if(maxX<0)throw new Exception("Empty generated UI asset: "+input);
        left=minX;top=minY;sw=maxX-minX+1;sh=maxY-minY+1;
      }
      for(int y=0;y<h;y++)for(int x=0;x<w;x++){
        int sx=left+Math.Min(sw-1,(int)((x+0.5)*sw/w)),sy=top+Math.Min(sh-1,(int)((y+0.5)*sh/h));
        Color c=src.GetPixel(sx,sy);
        if(capX>0)c=c.A<128?Color.FromArgb(0,0,0,0):Color.FromArgb(255,c.R,c.G,c.B);
        else c=Color.FromArgb(255,c.R,c.G,c.B);
        b.SetPixel(x,y,c);
      }
      Quantize(b,capX==0?Palette(b,32):UIPalette());
      if(capX>0){
        if(capY==0){
          for(int y=0;y<h;y++){Color c=b.GetPixel(w/2,y);for(int x=capX;x<w-capX;x++)b.SetPixel(x,y,c);}
        }else{
          for(int y=0;y<capY;y++){
            Color a=b.GetPixel(w/2,y),z=b.GetPixel(w/2,h-1-y);
            for(int x=capX;x<w-capX;x++){b.SetPixel(x,y,a);b.SetPixel(x,h-1-y,z);}
          }
          for(int x=0;x<capX;x++){
            Color a=b.GetPixel(x,h/2),z=b.GetPixel(w-1-x,h/2);
            for(int y=capY;y<h-capY;y++){b.SetPixel(x,y,a);b.SetPixel(w-1-x,y,z);}
          }
          for(int y=capY;y<h-capY;y++)for(int x=capX;x<w-capX;x++)b.SetPixel(x,y,Color.FromArgb(0,0,0,0));
        }
      }
      b.Save(output,ImageFormat.Png);
    }
  }
  static void Require(bool ok,string message){if(!ok)throw new Exception(message);}
  public static int Check(string path,int w,int h,int capX,int capY){
    using(var b=new Bitmap(path)){
      Require(b.Width==w&&b.Height==h,"Wrong dimensions: "+path);
      var colors=new HashSet<int>();int transparent=0,visible=0;
      for(int y=0;y<h;y++)for(int x=0;x<w;x++){
        Color c=b.GetPixel(x,y);colors.Add(c.ToArgb());
        Require(c.A==0||c.A==255,"Partial alpha: "+path);
        if(c.A==0)transparent++;else visible++;
      }
      Require(visible>0,"Empty asset: "+path);
      Require(colors.Count<=(capX==0?32:16),"Too many colors: "+path);
      Require(capX==0?transparent==0:transparent>0,"Wrong transparency: "+path);
      if(capX>0){
        if(capY==0){
          for(int y=0;y<h;y++)for(int x=capX;x<w-capX;x++)Require(b.GetPixel(x,y)==b.GetPixel(capX,y),"Nonrepeatable bar: "+path);
        }else{
          for(int y=capY;y<h-capY;y++)for(int x=capX;x<w-capX;x++)Require(b.GetPixel(x,y).A==0,"Center not transparent: "+path);
          for(int y=0;y<capY;y++)for(int x=capX;x<w-capX;x++){
            Require(b.GetPixel(x,y)==b.GetPixel(capX,y),"Nonrepeatable top: "+path);
            Require(b.GetPixel(x,h-1-y)==b.GetPixel(capX,h-1-y),"Nonrepeatable bottom: "+path);
          }
          for(int x=0;x<capX;x++)for(int y=capY;y<h-capY;y++){
            Require(b.GetPixel(x,y)==b.GetPixel(x,capY),"Nonrepeatable left: "+path);
            Require(b.GetPixel(w-1-x,y)==b.GetPixel(w-1-x,capY),"Nonrepeatable right: "+path);
          }
        }
      }
      Console.WriteLine(System.IO.Path.GetFileName(path)+": PASS (size, palette, alpha, slice seams)");
      return colors.Count;
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
    var dst=new Bitmap(b.Width*scale,b.Height*scale,PixelFormat.Format32bppArgb);
    for(int y=0;y<dst.Height;y++)for(int x=0;x<dst.Width;x++)dst.SetPixel(x,y,b.GetPixel(x/scale,y/scale));
    return dst;
  }
  public static void Preview(string dir){
    using(var dst=new Bitmap(1184,1380))using(var g=Graphics.FromImage(dst))using(var font=new Font("Segoe UI",12)){
      g.Clear(ColorTranslator.FromHtml("#F5EFEB"));
      Action<string,int,int> label=(s,x,y)=>g.DrawString(s,font,Brushes.Black,x,y);
      label("Studio landscape / 800 x 500",16,8);label("Portrait / 320 x 480",848,8);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"workbench-ui--landscape.png")))g.DrawImageUnscaled(b,16,36);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"workbench-ui--portrait.png")))g.DrawImageUnscaled(b,848,36);
      label("Lookbook / 9-slice / 16 px corners / 560 x 420",16,552);
      label("Controls / 9-slice / 10 px corners / 400 x 280",608,552);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"lookbook-modal--9slice.png")))using(var s=Slice(b,560,420,16,16))g.DrawImageUnscaled(s,16,584);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"studio-panel-frame--9slice.png")))using(var s=Slice(b,400,280,10,10))g.DrawImageUnscaled(s,608,584);
      label("Palette / 3-slice / 16 px ends",608,884);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"color-palette-bar--3slice.png")))using(var s=Slice(b,552,48,16,0))g.DrawImageUnscaled(s,608,912);
      label("Events / 3-slice / 14 px ends",608,968);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"event-selector-strip--3slice.png")))using(var s=Slice(b,552,40,14,0))g.DrawImageUnscaled(s,608,996);
      label("Original frame sprites x4 (nearest-neighbor)",16,1060);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"lookbook-modal--9slice.png")))using(var s=Zoom(b,4))g.DrawImageUnscaled(s,16,1096);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"studio-panel-frame--9slice.png")))using(var s=Zoom(b,4))g.DrawImageUnscaled(s,304,1096);
      label("Original bar sprites x3 (nearest-neighbor)",608,1060);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"color-palette-bar--3slice.png")))using(var s=Zoom(b,3))g.DrawImageUnscaled(s,608,1096);
      using(var b=new Bitmap(System.IO.Path.Combine(dir,"event-selector-strip--3slice.png")))using(var s=Zoom(b,3))g.DrawImageUnscaled(s,608,1252);
      dst.Save(System.IO.Path.Combine(dir,"_raw","preview.png"),ImageFormat.Png);
    }
  }
}
'@
}
$specs = @(
  @('workbench-ui--landscape',800,500,0,0,'screen-background-landscape','v1'),
  @('workbench-ui--portrait',320,480,0,0,'screen-background-portrait','v3'),
  @('lookbook-modal--9slice',64,64,16,16,'ui-frame-9slice','v1'),
  @('studio-panel-frame--9slice',48,48,10,10,'ui-frame-9slice','v1'),
  @('color-palette-bar--3slice',120,48,16,0,'ui-bar-3slice','v1'),
  @('event-selector-strip--3slice',120,40,14,0,'ui-bar-3slice','v1')
)
# Preflight every input/output before writing any file.
if (-not $VerifyOnly) {
  foreach ($spec in $specs) {
    $inputFile = Join-Path $PSScriptRoot ($spec[0] + '-' + $spec[6] + '.png')
    $outputFile = Join-Path $assetDirectory ($spec[0] + '.png')
    if (-not (Test-Path -LiteralPath $inputFile)) { throw "Missing source: $inputFile" }
    if ((Test-Path -LiteralPath $outputFile) -and -not $Overwrite) { throw "Output exists; use -VerifyOnly or explicitly pass -Overwrite: $outputFile" }
  }
  foreach ($spec in $specs) {
    [StudioImages]::Normalize((Join-Path $PSScriptRoot ($spec[0] + '-' + $spec[6] + '.png')), (Join-Path $assetDirectory ($spec[0] + '.png')), $spec[1], $spec[2], $spec[3], $spec[4])
  }
}
$entries = foreach ($spec in $specs) {
  $file = $spec[0] + '.png'
  $count = [StudioImages]::Check((Join-Path $assetDirectory $file),$spec[1],$spec[2],$spec[3],$spec[4])
  $entry = [ordered]@{ file=$file; source=('_raw/' + $spec[0] + '-' + $spec[6] + '.png'); kind=$spec[5]; width=$spec[1]; height=$spec[2]; rgbaColors=$count; alpha=$(if($spec[3] -eq 0){'opaque'}else{'binary'}); sha256=(Get-FileHash -LiteralPath (Join-Path $assetDirectory $file) -Algorithm SHA256).Hash.ToLower() }
  if ($spec[3] -gt 0) { $entry.slice = @{left=$spec[3]; right=$spec[3]; top=$spec[4]; bottom=$spec[4]; repeat=$(if($spec[4] -eq 0){'horizontal'}else{'edges'}); center=$(if($spec[4] -eq 0){'cream inset'}else{'transparent'})} }
  $entry
}
[StudioImages]::Preview($assetDirectory)
if (-not $VerifyOnly) {
  $manifest = [ordered]@{generatedWith='built-in image_gen'; technicalQA='passed'; artReview='AI-assisted visual inspection complete; human pixel cleanup and cultural review pending'; integration='asset-only; App.tsx currently returns null'; rendering='nearest-neighbor / image-rendering: pixelated'; portraitNote='320x480 is intentional per Studio README (2:3), despite legacy 9:16 label'; assets=@($entries)}
  [IO.File]::WriteAllText((Join-Path $assetDirectory 'asset-manifest.json'),($manifest | ConvertTo-Json -Depth 6),[Text.UTF8Encoding]::new($false))
}
