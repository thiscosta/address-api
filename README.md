<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.434 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Wed Sep 16 2020 22:59:58 GMT-0700 (PDT)
* Source doc: Serviço para consumo de endereços por CEP
----->


#Serviço para consumo de endereços por CEP
<br><br>
##Necessidade


Um serviço de busca de endereço que dado um CEP, busque os dados do endereço e retorne dados como **rua, bairro, cidade e estado** do CEP em questão. 
**	**
<br>
##Solução

A melhor solução para essa necessidade é uma API, que pode abstrair a regra de negócio da aplicação e ser disponibilizada de forma rápida para os consumidores. Devido a natureza da aplicação (API que faz requisições assíncronas para outras API’s), dentre as tecnologias **Java** e **NodeJS** a que melhor se adequa para essa solução é **NodeJS**, que devido a sua arquitetura **single threaded** e **non-blocking IO** tem melhor desempenho para operações assíncronas e consegue processar um número maior de requisições com maior eficiência no consumo de recursos. Além disso, possui uma biblioteca desenvolvida por um brasileiro chamada **cep-promise**, que consulta diversos provedores de endereço simultaneamente e retorna a primeira requisição que retornar, garantindo sempre um bom tempo de resposta.
**	**

<br>

##Arquitetura

Como se trata de uma aplicação pouco complexa, a melhor arquitetura a se seguir é um serviço único com **express**, que disponibiliza um servidor sem muitas recursos adicionais que seriam inutilizadas e também de fácil implementação para API’s REST. Ao gerar o deploy, a aplicação pode ser enviada para serviço de cluster Kubernetes em nuvem, onde podem ser configurados o autoscaling, load balancer entre outras ferramentas para otimizar a perfomance e estabilidade do serviço.
**	**

<br>

##Padrões

A estrutura do projeto é a padrão utilizada em API’s REST com NodeJS, com **controllers, services e rotas** separados em pastas dentro do diretório **src**, e sendo configurados na aplicação por meio de uma classe principal. Somente no service temos a camada de regras de negócio com a chamada para a lib **cep-promise** por meio de um método recursivo que implementa a **regra de negócio de adição de números 0 à direita** para os casos onde o CEP não é encontrado.
**	**

<br>

##Cenários da requisição pelo endereço



1. **CEP Encontrado com o valor enviado na requisição**: O caso mais simples e comum, aqui o cliente envia exatamente o valor do CEP e ele é encontrado em uma das bases do **cep-promise**, retornando todos os dados para o cliente (cep, estado, cidade, bairro, rua e o serviço que disponibilizou os dados).
<br>
2. CEP encontrado após a inclusão de n números zeros à direita do inicial: Nesse cenário, a API não encontra o CEP informado de primeira, e continua **substituindo o último dígito válido do CEP pelo número zero** até que o CEP seja encontrado.
<br>
3. CEP não encontrado mesmo com substituições pelo número zero: Nesse cenário, mesmo com a substituição de outros algarismos à direita pelo número zero o CEP não é encontrado. Nesse caso, a API retorna um **status code 404** para o cliente, informando que o CEP não foi encontrado.
**	**

<br>

##Execução da aplicação

Para executar a aplicação é necessário ter em sua máquina:



*   NodeJS 14.11.0 (Testado)
*   Um gerenciador de pacotes do NodeJS (NPM/YARN)

<br>

Após instalar essas dependências, siga o passo a passo abaixo:

<br>

*   Clone o repositório com o comando **git clone https://github.com/thiscosta/projeto-luizalabs.git**
<br>
*   Instale as dependências do projeto utilizando o comando **npm install** ou **yarn**, de acordo com seu gerenciador de pacotes
<br>
*   Crie um arquivo na raíz do projeto chamado **.env** para a configuração das variáveis de ambiente. **Existe um arquivo .env.example na raíz com todos os valores que foram utilizados durante o desenvolvimento, **recomendo que não altere a variável “PORT**”** pois o swagger foi configurado com ela.
<br>
*   Após criado o arquivo .env, basta executar o **script dev** do package.json, usando “**npm run dev**” **ou “**yarn dev**”**.
<br>
*   O projeto será executado e ficará disponível na porta definida no arquivo .env (**3000**)

<br><br>
Para visualizar o swagger da aplicação, acesse **http://localhost:&lt;porta do .env>/api-docs**
<br><br>

##Autor
**Thiago Costa**
Desenvolvedor de Software 
[Linkedin](https://www.linkedin.com/in/thiscosta00/)

	
