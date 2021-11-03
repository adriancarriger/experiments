class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m = len(s)
        n = len(p)
        dp = [[None]*(m + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            for j in range(m+1):
                if (i == 0 and j == 0):
                    dp[i][j] = True
                elif i == 0:
                    dp[i][j] = False
                elif j == 0:
                    if p[i-1] == '*':
                        dp[i][j] = dp[i-2][j]
                    else:
                        dp[i][j] = False
                else:
                    if p[i-1] == '*':
                        dp[i][j] = dp[i-2][j]
                        if (p[i-2] == s[j-1] or p[i-2] == '.'):
                            dp[i][j] = (dp[i][j-1] or dp[i][j])
                    elif (p[i-1] == s[j-1] or p[i-1] == '.'):
                        dp[i][j] = dp[i-1][j-1]
                    else:
                        dp[i][j] = False
        return dp[n][m]
