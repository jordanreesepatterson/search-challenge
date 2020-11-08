import React from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';
import ProfileModal from './ProfileModal';

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  state = {};

  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: 'descending' });
  };

  toggleProfileModal = (modalVisible, selectedProfile) => {
    console.log({ modalVisible, selectedProfile });
    this.setState({ modalVisible, selectedProfile });
  };

  render() {
    const { profiles = [] } = this.context;
    const { modalVisible = false, selectedProfile = {} } = this.state;

    console.log('search page');

    return (
      <React.Fragment>
        <Header />

        <main style={{ margin: 24, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MinimalButton disabled>
              <img src="filter.svg" width={22} alt="filter" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortAscending}>
              <img src="./ascending.svg" width={22} alt="Sort ascending" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortDescending}>
              <img src="./descending.svg" width={22} alt="Sort descending" />
            </MinimalButton>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridGap: '16px',
            }}
          >
            {profiles.map((profile) => (
              <SearchCard
                key={profile._id}
                id={profile._id}
                photoUrl={profile.photoUrl}
                handle={profile.name}
                location={profile.realm}
                onClick={() => this.toggleProfileModal(true, profile)}
              />
            ))}
          </div>
        </main>
        {modalVisible && (
          <ProfileModal profile={selectedProfile} onClick={() => this.toggleProfileModal(false)} />
        )}
      </React.Fragment>
    );
  }
}

export default SearchPage;
