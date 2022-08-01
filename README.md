# Tune.ly

O **Tune.ly** é um aplicativo para smartwatches da Samsung com o sistema Tizen. Ele permite identificar músicas a partir da gravação de um breve trecho - cerca de 10 segundos - e o enviando aos serviços da [ACR Cloud](https://www.acrcloud.com/pt-br/reconhecimento-musical/) - mesmo serviço usado pela Deezer, Xiaomi e Claro. O aplicativo, então, retornará dados como nome, artista, álbum, ano de lançamento, gênero, entre outros. Em alguns casos, com o smartwatch conectado ao celular, é possível abrir a faixa diretamente no Spotify. O aplicativo salva, também, todo o histórico das faixas encontradas localmente para consulta posterior.


![Libry](https://i.imgur.com/nwl8thC.jpg)


Com desenvolvimento iniciado em Abril de 2020, a aplicação logo estará disponível na Galaxy Store. Por hora, para instalá-la necessita das ferramentas para desenvolvimento do Tizen e um smartwatch com Tizen OS 2.3 ou superior, além de uma conta (gratuita) na [ACR Cloud](https://console.acrcloud.com/signup#/login?redirect=%2Fhome). Instruções para instalação podem ser encontradas abaixo.


## Tecnicamente…

Escrito com as tecnologias base da web: HTML, CSS e JavaScript. Alguma dificuldade foi enfrentada ao durante o desenvolvimento para capturar áudio pelo microfone interno do relógio: a [API de MediaRecording](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API) não estava disponível em aplicações Tizen OS direcionada a versão 4.0 - com tentativas em outras soluções, o melhor caminho envolveu fazer o downgrade da aplicação para a versão 2.3, seguindo a aplicação exemplo fornecida no Tizen Studio e usar uma biblioteca externa - a [RecordRTC](https://recordrtc.org/) - para fazer gravações no formato .WAV - haja visto que a ACR Cloud não se mostrou compatível com o formato padrão (.M4A/ACC).

A autenticação com os servidores da ACR também exige a geração de HMAC das chave e secret de acesso a cada requisição - a [API tradicional de criptografia](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) não estava disponível para a versão do Tizen em questão, portanto foi empregada a lib [jsSHA](https://github.com/Caligatio/jsSHA) em seu lugar.



## Como instalar?

Em breve, o Tune.ly estará disponível na Galaxy Store. Por hora, você precisará instalá-lo manualmente.

> Você pode **testar** o Tune.ly mesmo em seu computador. Clone o repositório e mova todos os arquivos a um servidor HTTP. Acesse a URL do servidor, redimensione a janela para 200x200 e siga os passos após a instalação para configurar.


Baixe o arquivo .wgt nas releases do projeto. Para instalar um arquivo .wgt em seu watch, é necessário o Device Manager disponível no Tizen Studio, ou o sdb (Samsung Device Bridge). A [documentação no site da Samsung](https://developer.samsung.com/galaxy-watch-tizen/testing-your-app-on-galaxy-watch.html) descreve o processo com detalhes, mas em resumo:

* Habilite as Opções de Desenvolvedor em seu smartwatch.
* Conecte seu watch na mesma rede Wi-Fi de seu desktop
* Utilize o [Device Manager](https://docs.tizen.org/application/vstools/tools/device-manager/) para localizar e conectar-se ao smartwatch.
* Execute o comando `tizen install -n TuneLy.wgt -t DEVNAME -- .`, onde DEVNAME representa o nome do dispositivo que é exibido no Device Manager.


#### Configuração

Após a aplicação instalada, é necessário configurar seus dados da [ACR Cloud](https://console.acrcloud.com/avr#/projects/online) e do [Spotify](https://developer.spotify.com/dashboard/applications). Com as contas de desenvolvedor e aplicativo criado em cada plataforma, crie um arquivo de texto em um site de armazenamento como o [PasteBin](https://pastebin.com) contendo as credenciais separadas por ponto e vírgula (;) na ordem a seguir:

* URL do servidor da ACR
* Chave de Acesso (Access Key) do projeto da ACR
* Chave Secreta (Secret Key) do projeto da ACR
* ID do Cliente (Client ID) do Spotify
* Segredo do Cliente (Client Secret) do Spotify

![Pastebin](https://i.imgur.com/touwI0s.png)

Após gerar o arquivo de texto, acesse-o no formato RAW. A URL gerada deve ser informada no aplicativo na primeira inicialização.

![Pastebin](https://i.imgur.com/tzdxVIA.png)
![Pastebin](https://i.imgur.com/kCD0DJ6.png)

