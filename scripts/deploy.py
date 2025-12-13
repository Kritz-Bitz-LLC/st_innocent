#!/usr/bin/env python3
"""
Deploy script for Saint Innocent Orthodox Church static site.
Builds the Next.js static site and rsyncs it to the server.
"""

import os
import sys
import subprocess
from pathlib import Path

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent
OUT_DIR = PROJECT_ROOT / "out"
REMOTE_HOST = os.getenv("ST_INNOCENTS_CLOUD", "root@saintinnocent.org")
REMOTE_PATH = "/var/www/ui"


def run_command(cmd, cwd=None, check=True):
    """Run a shell command and return the result."""
    print(f"🔄 Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd, check=check)
    return result


def main():
    """Main deployment function."""
    print("🚀 Starting deployment...\n")

    # Step 1: Build the static site
    print("📦 Building static site...")
    try:
        run_command(["pnpm", "build"], cwd=PROJECT_ROOT)
        print("✅ Build completed successfully\n")
    except subprocess.CalledProcessError as e:
        print(f"❌ Build failed with exit code {e.returncode}")
        sys.exit(1)

    # Verify out/ directory exists
    if not OUT_DIR.exists():
        print(f"❌ Build output directory '{OUT_DIR}' not found!")
        sys.exit(1)

    # Step 2: Deploy via rsync
    print(f"📤 Deploying to {REMOTE_HOST}:{REMOTE_PATH}...")
    rsync_cmd = [
        "rsync",
        "-avz",
        "--delete",
        f"{OUT_DIR}/",
        f"{REMOTE_HOST}:{REMOTE_PATH}/",
    ]

    try:
        run_command(rsync_cmd)
        print("✅ Deployment completed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Deployment failed with exit code {e.returncode}")
        sys.exit(1)


if __name__ == "__main__":
    main()

