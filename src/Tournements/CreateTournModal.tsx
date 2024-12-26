import { Modal, Form, Input, DatePicker, InputNumber, Select, Button } from 'antd';
import { useCurrentUser } from '@/Context/CurrentUserContext';
import { createNewTournament } from '../Actions/Tournements';
import { useGameTournamentContext } from '../Context/GameTournamentContext';

interface CreateTournModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}




const CreateTournModal: React.FC<CreateTournModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { currentUser } = useCurrentUser();
  const { allAvailableGames, tournamentTypes, setUpdateTournaments,updateTournaments } = useGameTournamentContext();

  function handleCreateTournModalButtonClick(formValues: any){
    if (currentUser) { // Check if currentUser is not null
      const updatedFormValues = { ...formValues, hostId: currentUser.id };
      createNewTournament(updatedFormValues)
      setUpdateTournaments(!updateTournaments)
      setIsModalOpen(false)
    } else {
      console.error("Current user is not available.");
    }
  }
  
  
  const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };


  return (
    <Modal 
    title={<div style={{ textAlign: 'center', marginBottom: '3em' }}>Create Tournament</div>} 
    open={isModalOpen} 
    onOk={handleOk} 
    onCancel={handleCancel}
    footer={null}
    >
    <Form
      layout="vertical"
      initialValues={{
        name: '',
        tournamentType: '',
        startDate: '',
        description: '',
        endDate: '',
        maxParticipants: '',
        game: '',
      }}
      onFinish={handleCreateTournModalButtonClick}
    >
    <Form.Item label="Game" name="gameName">
        <Select placeholder="Select Game">
          {allAvailableGames.map((game) => (
            <Select.Option key={game.id} value={game.name}>{game.name}</Select.Option>
          ))}
        </Select>
    </Form.Item>
      <Form.Item label="Tournament Name" name="name">
        <Input placeholder="Tournament Name" />
      </Form.Item>
      <Form.Item label="Tournament Type" name="tournamentTypeName">
        <Select placeholder="Select Tournament Type">
        {tournamentTypes.map((type) => (
            <Select.Option key={type.id} value={type.name}>{type.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} placeholder="Tournament Description" />
      </Form.Item>
      <Form.Item label="Start Date" name="startDate">
        <DatePicker placeholder="Start Date" />
      </Form.Item>
      <Form.Item label="End Date" name="endDate">
        <DatePicker placeholder="End Date" />
      </Form.Item>
      <Form.Item label="Max Participants" name="maxParticipants">
        <InputNumber min={1} placeholder="Max Participants" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Tournament
        </Button>
      </Form.Item>
    </Form>

    </Modal>
  )
}

export default CreateTournModal
