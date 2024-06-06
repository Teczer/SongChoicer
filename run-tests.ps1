while ($true) {
  pnpm run test
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Tests failed, stopping the loop."
    exit 1
  }
  Start-Sleep -Seconds 1
}
