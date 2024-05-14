# Swap BASE ETH para USDC

Este é um projeto desenvolvido como parte de uma avaliação para uma posição de Desenvolvedor Blockchain Sênior. O objetivo deste projeto é realizar uma troca funcional entre BASE ETH e USDC usando o Uniswap na rede BASE.

## Visão Geral

O Uniswap é um protocolo de troca descentralizada (DEX) que permite a troca direta de tokens ERC-20 sem a necessidade de intermediários. Neste projeto, a troca foi realizada em duas etapas devido à falta de um pool direto entre BASE ETH e USDC na rede BASE. Primeiro, foi feita uma troca de BASE ETH para ETH e, em seguida, uma troca de ETH para USDC.

## Requisitos

- Node.js

## Configuração

1. Clone este repositório para o seu ambiente local.
2. Instale as dependências usando o comando `npm install`.
3. Configure suas variáveis de ambiente em um arquivo `.env`, incluindo a URL RPC da rede BASE e suas chaves de API, se necessário.
4. Compile o projeto usando o comando `npm run build`.

## Uso

Execute o projeto usando o comando:

```bash
npm start
```

Este comando iniciará o processo de troca entre BASE ETH e USDC usando o Uniswap na rede BASE.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
