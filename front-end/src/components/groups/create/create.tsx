import { MouseEvent, useState } from 'react';
import { Container } from './create.style';

type props = {
  environmentSocket: WebSocket;
};

export default function CreateGroup({ environmentSocket }: props) {
  const [openForm, setOpenForm] = useState(false);
  const [value, setValue] = useState('');

  const onSubmitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      if (value.length > 0) {
        const context = {
          type: 'room.created',
          data: {
            new_room: value,
          },
        };
        environmentSocket?.send(JSON.stringify(context));
      }
    } finally {
      setOpenForm(false);
      setValue('');
    }
  };
  return (
    <>
      <button onClick={() => setOpenForm(true)}>Criar sala</button>;
      {openForm && (
        <Container>
          <form>
            <label htmlFor="create-room">(Limite de 1 sala por usuário)</label>
            <input
              type="text"
              id="create-room"
              value={value}
              placeholder="Nome da sala"
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="create-options">
              <button type="submit" onClick={onSubmitHandler}>
                Criar sala
              </button>
              <button
                onClick={() => {
                  setOpenForm(false);
                  setValue('');
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Container>
      )}
    </>
  );
}
