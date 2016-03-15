# Contributing

1.  Update local gh-pages branch:

        $ git checkout gh-pages
        $ git pull upstream gh-pages

2.  Create feature branch:

        $ git checkout -b feature-x

3.  Make one or more atomic commits, and ensure that each commit has a
    descriptive commit message. Commit messages should be line wrapped
    at 72 characters.

4.  Run `make` to build the site. This requires a recent version of Node.

5.  Review the changes in a browser.

6.  Run `make test lint`, and address any errors. Preferably, fix commits
    in place using `git rebase` or `git commit --amend` to make the changes
    easier to review.

7.  Push:

        $ git push origin feature-x

8.  Open a pull request. Include screenshots if applicable.
