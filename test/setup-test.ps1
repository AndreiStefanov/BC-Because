param(
    [string]$BranchName = ("test/run-" + (Get-Date -Format 'yyyyMMdd-HHmmss'))
)

git checkout main
git pull origin main

git branch -D $BranchName 2>$null
git push origin --delete $BranchName 2>$null

git checkout -b $BranchName
"// test trigger $BranchName" | Out-File -Append -Encoding utf8 README.md
git add README.md
git commit -m "test: trigger action"
git push origin $BranchName

Write-Host ""
Write-Host "Branch pushed: $BranchName"
Write-Host "Open: https://github.com/AndreiStefanov/BC-Because/compare/main...$BranchName"