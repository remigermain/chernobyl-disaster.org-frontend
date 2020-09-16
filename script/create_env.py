#!/usr/bin/python3
import argparse
import re

REGEX = r"[\t ]+"
reg_space = re.compile(REGEX)


def main():
    ENV = {
        "BACKEND_URL": "http://localhost:8000",
        "SITE_URL": "http://localhost:3000",
        "SITE_NAME": "chernobyl",
        "SERVER_PORT": None,
    }

    env = ENV.copy()
    open_f = "a" if flag.fusion else "w"  # append or write

    if flag.fusion:
        with open(".env", "r") as f:
            _file = reg_space.sub(" ", f.read()).split("\n")
            for line in _file:
                key = line.strip().split("=")[0]
                if key in env:
                    del env[key]

    with open(".env", open_f) as f:
        for key, val in env.items():
            f.write(f"export {key}={val}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="generate env files")
    parser.add_argument("-f", "--fusion", action="store_true", help="open existing env file, if key with value exsit, do nothing", default=False)
    flag = parser.parse_args()
    main()
