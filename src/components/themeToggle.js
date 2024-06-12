import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from './actions/themeActions';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode
});

const mapDispatchToProps = {
  toggleTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
