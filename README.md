## SMART HOUSE BACKEND

Sistema para controle de equipamentos integrado com um microcontrolador, o mesmo faz a gestão de equipamentos enviado eventos por o MQTT.
Imagem do fluxo das informações abaixo:

![img](https://i.imgur.com/1GzBENl.png)



#### COMPORTAMENTO MICROCONTROLADOR 
1 - O equipamento deve está ouvindo o topico `/schedule/equipment/{id_equipamento}` do MQTT para receber comandos do servidor.

 
  ```JS
    // Formato da possiveis mensagem enviada para o topico no MQTT
   {
      equipment_id:"273c22ee-b4f7-4c0e-9e31-0027d613c73d", //id do equipamento
      action:"ON", // se o equipamento deve ser ligado ou deslidado ON / OFF
   }
   ```
   
2 - A Placa deve conter um sensor que medirá e enviara a temperado do local sempre que ocorrer uma alteração, os dados devem ser 
  enviados para o topico `/equipment/update-info/{id_equipamento}`
```JS
    // Formato da possiveis mensagem enviada para o topico no MQTT
   {
      id:"9f754a80-9cb5-4ec1-b767-01649ea384ff", //id do equipamento
      user_id:"273c22ee-b4f7-4c0e-9e31-0027d613c73d", //id do usuario dono do equipamento
      power:"ON", // se está ligado ou deslidado ON / OFF
      temperature: 20 // Temperatura do equipamento
   }
   ```
   * Obs: Caso a temperatura enviada seja maior que 22° e menor que 15° é enviado a ação de ligar ou desligar o equipamento. 


## INSTALAÇÃO DO PROJETO

### Tecnologias usadas

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Typeorm](https://typeorm.io/)
* [Docker](https://www.docker.com/)

### Clone o projeto 
   ```sh
   git clone https://github.com/gilgledson/smart-house-back-end
   ```
### Subindo os containers 
   ```sh
    cd ./smart-house-back-end && docker-compose up -d
   ```

