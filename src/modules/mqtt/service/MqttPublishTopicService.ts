import MQTTClientService from './MqttClientService';

export default class MqttPublishTopicService {
  MQTTClientService: MQTTClientService;
  public async execute(topic: string, message: string): Promise<void> {
    const mqttService = new MQTTClientService();
    const client = await mqttService.mqttClient;
    client.on('connect', () => {
      client.publish(topic, message, { qos: 0, retain: false }, error => {
        if (error) {
          console.error(error);
        }
      });
    });
  }
}
