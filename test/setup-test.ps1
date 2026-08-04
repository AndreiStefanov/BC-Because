# test/setup-test.ps1
param([string]$BranchName = "test/run-$(Get-Date -Format 'yyyyMMdd-HHmmss')")

git checkout main
git pull origin main

# Delete local + remote if exists
git branch -D $BranchName 2>$null
git push origin --delete $BranchName 2>$null

git checkout -b $BranchName
Write-Output "// test trigger $BranchName" >> README.md
git add README.md
git commit -m "test: trigger action"
git push origin $BranchName

Write-Host "`n✓ Branch pushed: $BranchName"
Write-Host "Now open: https://github.com/AndreiStefanov/BC-Because/compare/main...$BranchName`n"