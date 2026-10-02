param([string]$AssetDirectory = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
if (-not ('MainShopImages' -as [type])) {
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using System.Linq;
public static class MainShopImages {
  class Sample { public Color C; public int N; }
  static int Channel(Color c, int i) { return i == 0 ? c.R : i == 1 ? c.G : i == 2 ? c.B : c.A; }
  static Color[] Palette(Bitmap b, int limit) {
    var h = new Dictionary<int,Sample>();
    for(int y=0;y<b.Height;y++) for(int x=0;x<b.Width;x++) {
      Color c=b.GetPixel(x,y); if(c.A==0) continue;
      int k=((c.A>>4)<<15)|((c.R>>3)<<10)|((c.G>>3)<<5)|(c.B>>3);
      if(!h.ContainsKey(k)) h[k]=new Sample{C=c,N=0}; h[k].N++;
    }
    var boxes=new List<List<Sample>>{h.Values.ToList()};
    while(boxes.Count<limit) {
      int bi=-1,ci=0; double best=-1;
      for(int i=0;i<boxes.Count;i++) {
        if(boxes[i].Count<2) continue;
        int total=boxes[i].Sum(s=>s.N);
        for(int j=0;j<4;j++) {
          int range=boxes[i].Max(s=>Channel(s.C,j))-boxes[i].Min(s=>Channel(s.C,j));
          double score=range*Math.Sqrt(total);
          if(score>best){best=score;bi=i;ci=j;}
        }
      }
      if(bi<0||best<=0) break;
      var sorted=boxes[bi].OrderBy(s=>Channel(s.C,ci)).ToList();
      int half=sorted.Sum(s=>s.N)/2,acc=0,split=1;
      for(int i=0;i<sorted.Count-1;i++){acc+=sorted[i].N;split=i+1;if(acc>=half)break;}
      boxes[bi]=sorted.Take(split).ToList(); boxes.Add(sorted.Skip(split).ToList());
    }
    return boxes.Select(box=> {
      long n=box.Sum(s=>(long)s.N);
      return Color.FromArgb((int)(box.Sum(s=>(long)s.C.A*s.N)/n),(int)(box.Sum(s=>(long)s.C.R*s.N)/n),(int)(box.Sum(s=>(long)s.C.G*s.N)/n),(int)(box.Sum(s=>(long)s.C.B*s.N)/n));
    }).ToArray();
  }
  static void Quantize(Bitmap b, Color[] palette) {
    var cache=new Dictionary<int,Color>();
    for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){
      Color c=b.GetPixel(x,y); if(c.A==0){b.SetPixel(x,y,Color.Transparent);continue;}
      Color mapped;
      if(!cache.TryGetValue(c.ToArgb(),out mapped)){
        double best=double.MaxValue; mapped=palette[0];
        foreach(Color p in palette){
          double ar=c.A-p.A,rr=(c.R*c.A-p.R*p.A)/255.0,gg=(c.G*c.A-p.G*p.A)/255.0,bb=(c.B*c.A-p.B*p.A)/255.0;
          double d=rr*rr+gg*gg+bb*bb+ar*ar*2;
          if(d<best){best=d;mapped=p;}
        }
        cache[c.ToArgb()]=mapped;
      }
      b.SetPixel(x,y,mapped);
    }
  }
  static Color Hex(string s){return ColorTranslator.FromHtml(s);}
  public static void Normalize(string input,string output,int w,int h,string kind){
    using(var src=new Bitmap(input))using(var b=new Bitmap(w,h,PixelFormat.Format32bppArgb)){
      int left=0,top=0,sw=src.Width,sh=src.Height;
      if(kind=="background"){
        double target=(double)w/h;
        if((double)sw/sh>target){sw=(int)Math.Round(sh*target);left=(src.Width-sw)/2;}
        else {sh=(int)Math.Round(sw/target);top=(src.Height-sh)/2;}
      }else{
        int minX=src.Width,minY=src.Height,maxX=-1,maxY=-1;
        for(int y=0;y<src.Height;y++)for(int x=0;x<src.Width;x++)if(src.GetPixel(x,y).A>12){minX=Math.Min(minX,x);minY=Math.Min(minY,y);maxX=Math.Max(maxX,x);maxY=Math.Max(maxY,y);}
        if(maxX<0)throw new Exception("Empty transparent image: "+input);
        left=minX;top=minY;sw=maxX-minX+1;sh=maxY-minY+1;
      }
      int margin=kind=="vfx"?2:0;
      for(int y=margin;y<h-margin;y++)for(int x=margin;x<w-margin;x++){
        int sx=left+Math.Min(sw-1,(int)((x-margin+0.5)*sw/(w-margin*2)));
        int sy=top+Math.Min(sh-1,(int)((y-margin+0.5)*sh/(h-margin*2)));
        Color c=src.GetPixel(sx,sy);
        if(kind=="bar"||kind=="frame")c=c.A<128?Color.Transparent:Color.FromArgb(255,c.R,c.G,c.B);
        b.SetPixel(x,y,c);
      }
      if(kind=="bar"||kind=="frame"){
        Quantize(b,new[]{Hex("#2B2035"),Hex("#74506E"),Hex("#855064"),Hex("#FFF1DF"),Hex("#FFF8EE"),Hex("#E9B66B"),Hex("#D986A7"),Hex("#F4CAD7")});
        if(kind=="bar"){
          for(int y=0;y<h;y++){Color c=b.GetPixel(w/2,y);for(int x=16;x<w-16;x++)b.SetPixel(x,y,c);}
        }else{
          for(int y=0;y<12;y++){
            Color a=b.GetPixel(w/2,y),z=b.GetPixel(w/2,h-1-y);
            for(int x=12;x<w-12;x++){b.SetPixel(x,y,a);b.SetPixel(x,h-1-y,z);}
          }
          for(int x=0;x<12;x++){
            Color a=b.GetPixel(x,h/2),z=b.GetPixel(w-1-x,h/2);
            for(int y=12;y<h-12;y++){b.SetPixel(x,y,a);b.SetPixel(w-1-x,y,z);}
          }
          for(int y=12;y<h-12;y++)for(int x=12;x<w-12;x++)b.SetPixel(x,y,Hex("#FFF1DF"));
        }
      }else Quantize(b,Palette(b,kind=="background"?32:15));
      if(System.IO.File.Exists(output))throw new Exception("Refusing to overwrite existing asset: "+output);
      b.Save(output,ImageFormat.Png);
    }
  }
  public static string Inspect(string path){
    using(var b=new Bitmap(path)){
      var rgba=new HashSet<int>();int transparent=0,partial=0;
      for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){Color c=b.GetPixel(x,y);rgba.Add(c.ToArgb());if(c.A==0)transparent++;else if(c.A<255)partial++;}
      return String.Format("{0}: {1}x{2}; {3} RGBA colors; {4} transparent pixels; {5} partial-alpha pixels",System.IO.Path.GetFileName(path),b.Width,b.Height,rgba.Count,transparent,partial);
    }
  }
}
'@
}
$specs = @(
    @('background--landscape', 800, 500, 'background', 'v2'),
    @('background--portrait', 320, 480, 'background', 'v1'),
    @('ui-hud--3slice', 120, 40, 'bar', 'v1'),
    @('action-card-frame--9slice', 64, 64, 'frame', 'v1'),
    @('door-entrance-glow', 64, 96, 'vfx', 'v1')
)
foreach ($spec in $specs) {
    $inputFile = Join-Path $AssetDirectory ('_raw/' + $spec[0] + '-' + $spec[4] + '.png')
    $outputFile = Join-Path $AssetDirectory ($spec[0] + '.png')
    [MainShopImages]::Normalize($inputFile, $outputFile, $spec[1], $spec[2], $spec[3])
    [MainShopImages]::Inspect($outputFile)
}
