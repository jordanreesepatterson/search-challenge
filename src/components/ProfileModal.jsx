import React from 'react';

const button = {
  width: '130px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: '3px',
  outline: 0,
};

const styles = {
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '500px',
    margin: '100px auto',
    background: '#fff',
    padding: 20,
  },
  close: {
    ...button,
    border: '2px solid rgb(255, 99, 71)',
    background: 'rgba(255, 99, 71, 0.1)',
    color: 'rgb(255, 99, 71)',
  },
  poke: {
    ...button,
    border: '2px solid rgb(60, 179, 113)',
    background: 'rgba(60, 179, 113, 0.1)',
    color: 'rgb(60, 179, 113)',
  },
  message: {
    ...button,
    border: '2px solid rgb(0, 0, 255)',
    background: 'rgba(0, 0, 255, 0.1)',
    color: 'rgb(0, 0, 255)',
  },
  info: {
    display: 'flex',
    paddingBottom: 10,
  },
};

const ProfileModal = (props) => {
  const { profile = {}, onClick = () => {} } = props;

  const infoRow = (datapoint) => (
    <div style={styles.info}>
      <span style={{ width: 100, textTransform: 'capitalize' }}>{datapoint}:</span>
      <span>{profile[datapoint]}</span>
    </div>
  );

  const displays = ['birth', 'gender', 'realm', 'height', 'hair'];

  return (
    <div style={styles.backdrop}>
      <div style={styles.card}>
        <div style={{ display: 'flex' }}>
          <img src={profile.photoUrl} alt="avatar" />
          <div style={{ padding: '0px 20px', fontSize: '12px' }}>
            <h3>{profile.name}</h3>
            {/* overkill, but something fun to clean up code */}
            {displays.map((d) => infoRow(d))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px 0' }}>
          <button onClick={onClick} style={styles.close}>
            Close
          </button>
          <button onClick={onClick} style={styles.poke}>
            Poke
          </button>
          <button onClick={onClick} style={styles.message}>
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
