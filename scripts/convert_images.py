"""
    st_innocent/scripts/convert_images.py
    
    Converts jpg/jpeg/png images to webp format.
    
    Usage:
        python convert_images.py <input_dir> [--output <output_dir>]
        
    Examples:
        python convert_images.py snapshot/
        python convert_images.py snapshot/ --output ui/public/img
        python convert_images.py /path/to/images -o /path/to/output
"""

import os
import sys
import argparse
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    sys.exit(1)


def convert_to_webp(input_path: Path, output_path: Path, quality: int = 85):
    """Convert an image to webp format."""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency, use RGBA)
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            
            img.save(output_path, 'WEBP', quality=quality)
            return True
    except Exception as e:
        print(f"  ✗ Error converting {input_path.name}: {e}")
        return False


def copy_svg(input_path: Path, output_path: Path):
    """Copy SVG files as-is (no conversion needed)."""
    try:
        with open(input_path, 'rb') as src, open(output_path, 'wb') as dst:
            dst.write(src.read())
        return True
    except Exception as e:
        print(f"  ✗ Error copying {input_path.name}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Convert JPG/PNG images to WebP format",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python convert_images.py snapshot/
  python convert_images.py snapshot/ --output ui/public/img
  python convert_images.py /path/to/images -o /path/to/output
        """
    )
    parser.add_argument(
        "input_dir",
        type=str,
        help="Directory containing images to convert"
    )
    parser.add_argument(
        "-o", "--output",
        type=str,
        default="ui/public/img",
        help="Output directory for converted images (default: ui/public/img)"
    )
    parser.add_argument(
        "-q", "--quality",
        type=int,
        default=85,
        help="WebP quality (1-100, default: 85)"
    )
    
    args = parser.parse_args()
    
    # Resolve paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    input_dir = Path(args.input_dir)
    if not input_dir.is_absolute():
        input_dir = project_root / input_dir
    
    output_dir = Path(args.output)
    if not output_dir.is_absolute():
        output_dir = project_root / output_dir
    
    print("=" * 60)
    print("Image Converter (JPG/PNG -> WebP)")
    print("=" * 60)
    print(f"\nSource:      {input_dir}")
    print(f"Destination: {output_dir}")
    print(f"Quality:     {args.quality}")
    
    # Check source directory
    if not input_dir.exists():
        print(f"\n✗ Input directory not found: {input_dir}")
        sys.exit(1)
    
    if not input_dir.is_dir():
        print(f"\n✗ Input path is not a directory: {input_dir}")
        sys.exit(1)
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"\n✓ Output directory ready")
    
    # Find all images
    image_extensions = {'.jpg', '.jpeg', '.png'}
    svg_extension = '.svg'
    
    converted = 0
    copied = 0
    skipped = 0
    
    print("\nProcessing images...\n")
    
    for file_path in sorted(input_dir.iterdir()):
        if not file_path.is_file():
            continue
            
        ext = file_path.suffix.lower()
        
        if ext in image_extensions:
            # Convert to webp
            output_name = file_path.stem + ".webp"
            output_path = output_dir / output_name
            
            if convert_to_webp(file_path, output_path, args.quality):
                # Get file sizes for comparison
                original_size = file_path.stat().st_size / 1024
                new_size = output_path.stat().st_size / 1024
                savings = ((original_size - new_size) / original_size) * 100 if original_size > 0 else 0
                
                print(f"  ✓ {file_path.name} -> {output_name}")
                print(f"      {original_size:.1f}KB -> {new_size:.1f}KB ({savings:.1f}% smaller)")
                converted += 1
            else:
                skipped += 1
                
        elif ext == svg_extension:
            # Copy SVG as-is
            output_path = output_dir / file_path.name
            
            if copy_svg(file_path, output_path):
                print(f"  ✓ {file_path.name} (copied as-is)")
                copied += 1
            else:
                skipped += 1
        else:
            # Skip non-image files
            if ext not in {'.json', '.txt', '.md'}:
                print(f"  - {file_path.name} (skipped)")
            skipped += 1
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"  Converted to WebP: {converted}")
    print(f"  SVGs copied:       {copied}")
    print(f"  Skipped:           {skipped}")
    print(f"  Output directory:  {output_dir}")
    print("=" * 60)


if __name__ == "__main__":
    main()
