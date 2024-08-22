import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const buttonTypes = {
    submit: { backgroundColor: '#007BFF', textColor: '#fff' },
    primary: { backgroundColor: '#007BFF', textColor: '#fff' },
    accept: { backgroundColor: '#28a745', textColor: '#fff' },
    success: { backgroundColor: '#28a745', textColor: '#fff' },
    cancel: { backgroundColor: '#dc3545', textColor: '#fff' },
    delete: { backgroundColor: '#dc3545', textColor: '#fff' },
    danger: { backgroundColor: '#dc3545', textColor: '#fff' },
    edit: { backgroundColor: '#ffc107', textColor: '#000' },
    warning: { backgroundColor: '#ffc107', textColor: '#000' },
    view: { backgroundColor: '#17a2b8', textColor: '#fff' },
    info: { backgroundColor: '#17a2b8', textColor: '#fff' },
    disabled: { backgroundColor: '#6c757d', textColor: '#fff' },
    secondary: { backgroundColor: '#6c757d', textColor: '#fff' },
    light: { backgroundColor: '#f8f9fa', textColor: '#000' },
    dark: { backgroundColor: '#343a40', textColor: '#fff' },
    completed: { backgroundColor: '#28a745', textColor: '#fff' },
};

const StyleButton = ({ title, type, style, textStyle, ...props }) => {
  const buttonStyle = buttonTypes[type] || buttonTypes.submit; // Default to 'submit' type

  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: buttonStyle.backgroundColor, ...style }}
      {...props}
    >
      <Text style={{ ...styles.text, color: buttonStyle.textColor, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    
  },
  text: {
    fontSize: 16,
  },
});

export default StyleButton;