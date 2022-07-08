import MQTTClientService from './MqttClientService';
import UpdateEquipmentStatusAndTemperature from '../../equipment/services/UpdateEquipmentStatusAndTemperature';

export default class MqttSubscribeUpdateEquipmentService {
  MQTTClientService: MQTTClientService;
  EquipmentService: UpdateEquipmentStatusAndTemperature;
  public async execute(): Promise<void> {
    const mqttService = new MQTTClientService();
    const equipmentService = new UpdateEquipmentStatusAndTemperature();
    const client = await mqttService.mqttClient;
    client.on('message', async (topic, message) => {
      if (topic.match('/equipment/update-info/')) {
        try {
          const { user_id, id, power, temperature } = JSON.parse(
            message.toString(),
          );
          await equipmentService.execute({ user_id, id, power, temperature });
        } catch (error) {
          console.log(error);
        }
      }
    });
    client.on('connect', () => {
      client.subscribe('/equipment/update-info/#', (err, granted) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }
}
