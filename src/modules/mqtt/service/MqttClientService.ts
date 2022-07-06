import mqtt from 'mqtt';

export default class MQTTClientService {
  public mqttClient: mqtt.Client;
  host: string;
  port: string;
  clientId: string;

  public constructor() {
    this.host = process.env.MQTT_HOST || 'localhost';
    this.port = process.env.MQTT_PORT || '1883';
    this.clientId = `smart_house_${Math.random().toString(22).slice(3)}`;
    const connectUrl = `mqtt://${this.host}:${this.port}`;
    this.mqttClient = mqtt.connect(connectUrl, {
      clientId: this.clientId,
      clean: true,
      connectTimeout: 4000,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 1000,
    });
  }
}
