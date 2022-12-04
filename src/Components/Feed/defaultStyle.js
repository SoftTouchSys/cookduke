import { grey } from "@mui/material/colors";

export default {
  control: {
    fontSize: 14,
    fontWeight: 'normal',
    width: 250,
    height: "35px",
    borderRadius: "5px",
    background:"white",
    marginLeft:"10px",
    marginTop:"5px",
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace',
      minHeight: 15,

    },
    highlighter: {
      padding: 9,

    },
    input: {
      padding: 9,
      width: 300,
      outline:"none",
      border: "none!important",
      marginLeft:"10px",
      borderRadius: "5px",
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: "none!important",
    },
    input: {
      padding: 1,
      border: "none!important",
      marginLeft:"10px",
      borderRadius: "5px",
      border:'1px solid rgb(234, 234, 234)',
      padding: 8,
      width: 300,
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#fff3e0',
      },
    },
  },
}