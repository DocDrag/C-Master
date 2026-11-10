@echo off
title C Master - Remote Teaching Server
cd /d "%~dp0"
echo Starting C Master Server...
python run_server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo An error occurred. Press any key to exit...
    pause >nul
)

