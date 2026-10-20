Add-Type -AssemblyName System.Drawing

$srcLogo = "src\assets\images\humsafar_main_logo.png"
if (-not (Test-Path $srcLogo)) {
    Write-Error "Source logo not found at $srcLogo"
    exit 1
}

$sourceImg = [System.Drawing.Image]::FromFile((Resolve-Path $srcLogo).Path)

function Resize-Image {
    param(
        [System.Drawing.Image]$img,
        [int]$width,
        [int]$height,
        [string]$outPath
    )
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
    $destImg = New-Object System.Drawing.Bitmap($width, $height)
    $destImg.SetResolution($img.HorizontalResolution, $img.VerticalResolution)

    $graphics = [System.Drawing.Graphics]::FromImage($destImg)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $graphics.DrawImage($img, $destRect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()

    $parentDir = [System.IO.Path]::GetDirectoryName($outPath)
    if (-not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }

    $destImg.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destImg.Dispose()
    Write-Host "Generated: $outPath ($width x $height)"
}

function Generate-Splash {
    param(
        [System.Drawing.Image]$logo,
        [int]$width,
        [int]$height,
        [string]$outPath
    )
    $destImg = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($destImg)
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # Background fill: Deep Emerald Brand Color #03150f
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 3, 21, 15))
    $graphics.FillRectangle($bgBrush, 0, 0, $width, $height)
    $bgBrush.Dispose()

    # Draw centered logo (approx 40% of smaller dimension)
    $logoDim = [Math]::Min([int]($width * 0.45), [int]($height * 0.35))
    if ($logoDim -lt 120) { $logoDim = 120 }
    if ($logoDim -gt $logo.Width) { $logoDim = $logo.Width }

    $x = ($width - $logoDim) / 2
    $y = ($height - $logoDim) / 2 - [int]($height * 0.04)
    $logoRect = New-Object System.Drawing.Rectangle($x, $y, $logoDim, $logoDim)

    $graphics.DrawImage($logo, $logoRect, 0, 0, $logo.Width, $logo.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()

    $parentDir = [System.IO.Path]::GetDirectoryName($outPath)
    if (-not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }

    $destImg.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destImg.Dispose()
    Write-Host "Splash Generated: $outPath ($width x $height)"
}

# 1. Generate PWA Icons
Resize-Image $sourceImg 512 512 "public\icon-512.png"
Resize-Image $sourceImg 192 192 "public\icon-192.png"
Resize-Image $sourceImg 180 180 "public\apple-touch-icon.png"
Resize-Image $sourceImg 48 48 "public\favicon.png"

# 2. Generate Android Adaptive Mipmap Icons
$mipmaps = @(
    @{ dir = "android\app\src\main\res\mipmap-mdpi"; size = 48 },
    @{ dir = "android\app\src\main\res\mipmap-hdpi"; size = 72 },
    @{ dir = "android\app\src\main\res\mipmap-xhdpi"; size = 96 },
    @{ dir = "android\app\src\main\res\mipmap-xxhdpi"; size = 144 },
    @{ dir = "android\app\src\main\res\mipmap-xxxhdpi"; size = 192 }
)

foreach ($m in $mipmaps) {
    Resize-Image $sourceImg $m.size $m.size "$($m.dir)\ic_launcher.png"
    Resize-Image $sourceImg $m.size $m.size "$($m.dir)\ic_launcher_round.png"
    Resize-Image $sourceImg $m.size $m.size "$($m.dir)\ic_launcher_foreground.png"
}

# 3. Generate Branded Splash Screens
$splashes = @(
    @{ path = "android\app\src\main\res\drawable\splash.png"; w = 480; h = 800 },
    @{ path = "android\app\src\main\res\drawable-port-mdpi\splash.png"; w = 320; h = 480 },
    @{ path = "android\app\src\main\res\drawable-port-hdpi\splash.png"; w = 480; h = 800 },
    @{ path = "android\app\src\main\res\drawable-port-xhdpi\splash.png"; w = 720; h = 1280 },
    @{ path = "android\app\src\main\res\drawable-port-xxhdpi\splash.png"; w = 960; h = 1600 },
    @{ path = "android\app\src\main\res\drawable-port-xxxhdpi\splash.png"; w = 1280; h = 1920 },
    @{ path = "android\app\src\main\res\drawable-land-mdpi\splash.png"; w = 480; h = 320 },
    @{ path = "android\app\src\main\res\drawable-land-hdpi\splash.png"; w = 800; h = 480 },
    @{ path = "android\app\src\main\res\drawable-land-xhdpi\splash.png"; w = 1280; h = 720 },
    @{ path = "android\app\src\main\res\drawable-land-xxhdpi\splash.png"; w = 1600; h = 960 },
    @{ path = "android\app\src\main\res\drawable-land-xxxhdpi\splash.png"; w = 1920; h = 1280 }
)

foreach ($s in $splashes) {
    Generate-Splash $sourceImg $s.w $s.h $s.path
}

$sourceImg.Dispose()
Write-Host "All icons and splash screens successfully generated!"
