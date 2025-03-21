{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };

        inherit (pkgs) lib;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun
            biome
            prettierd
            svelte-language-server
            tailwindcss-language-server
            typescript-language-server
          ];
        };
      }
    );
}
