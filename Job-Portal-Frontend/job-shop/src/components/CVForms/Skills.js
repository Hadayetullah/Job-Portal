import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { Button, Grid, Typography, TextField, } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Navigate} from 'react-router-dom';

import axios from 'axios';


const Root = styled('div')(
    ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'red' : '#888888'
        };
        font-size: 15px;
`,
);

// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

const InputWrapper = styled('div')(
    ({ theme }) => `
  width: 100%;
  min-width: 410px;
  border: 1px solid ${theme.palette.mode === 'dark' ? 'red' : '#A6A6A6'};
  background-color: ${theme.palette.mode === 'dark' ? 'red' : '#fff'};
  border-radius: 4px;
  padding: 7px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? 'red' : '#A6A6A6'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? 'red' : '#A6A6A6'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#A6A6A6' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'red' : '#A1A1A1'
        };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
    ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'red' : '#fafafa'
        };
  border: 1px solid ${theme.palette.mode === 'dark' ? 'red' : '#A6A6A6'};
  border-radius: 15px;
  box-sizing: content-box;
  padding: 2px 7px 2px 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? 'red' : '#A6A6A6'};
    background-color: ${theme.palette.mode === 'dark' ? '#A6A6A6' : '#A6A6A6'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 17px;
    background-color: #A6A6A6;
    cursor: pointer;
    padding: 0px;
    border-radius: 30px;
    margin-left: 10px;
    color: #fff;
  }
`,
);

const Listbox = styled('ul')(
    ({ theme }) => `
    width: 55%;
    min-width: 420px;
  margin: 2px 0px 2px 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? 'red' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    font-size: 20px;
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #fff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? 'red' : '#F5F5F5'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function Skills() {
    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        options: keyPoint,
        getOptionLabel: (option) => option.title,
    });



    const [allSkills, setAllSkills] = React.useState(null);

    
    
    React.useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            return <Navigate to="/" />
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationTime"));
            if (expirationTime <= new Date()) {
                return <Navigate to="/" />
            } else {
                const userId = localStorage.getItem("userId");
                let url = "https://hadayetullah002.pythonanywhere.com/api/userinfo/";
                axios.get(url + userId + "/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => {
                    let data = [];
                    let res = response.data.skills;
                    res = res.substring(0, res.length - 1);
                    if(res != '' || res != null){
                        data = res.split(",");
                        setAllSkills(data);
                    }
                })
                .catch(err => console.log(err))
            }
        }
    },[])

    

    const skillValues = e => {
        let skills = "";
        value.forEach(i => {
            skills = skills + i.title + ",";
        })
        

        if(skills != ""){
            const token = localStorage.getItem("token");
            if (!token) {
                return <Navigate to="/" />
            } else {
                const expirationTime = new Date(localStorage.getItem("expirationTime"));
                if (expirationTime <= new Date()) {
                    return <Navigate to="/" />
                } else {
                    const userId = localStorage.getItem("userId");
                    let body = {
                        skills: skills,
                        user: userId
                    };

                    axios.put(`https://hadayetullah002.pythonanywhere.com/api/userinfo/${userId}/`, body, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                    })
                    .then(response => {
                            let data = [];
                            let res = response.data.skills;
                            res = res.substring(0, res.length - 1);
                            if(res != '' || res != null){
                            data = res.split(",");
                            setAllSkills(data);
                        }
                    })
                    .catch(err => console.log(err))
                }
            }
        }
        e.preventDefault();
    }





    return (
        <Root>
            <form onSubmit={(e) => skillValues(e)} style={{ marginRight: "30px" }}>
                <Typography
                    textAlign={"left"}
                    marginBottom="35px"
                    fontWeight={"bold"}
                    variant='h6'
                    textTransform={"uppercase"}
                    borderBottom={"1px solid #D2D5D8"}
                    >
                    Skills Information
                </Typography>
                    
                
                <Box sx={{width:"100%",padding:"0", margin:"0"}}>
                    <List sx={{width:"100%",padding:"0", margin:"0",fontSize:"10px"}}>
                        {
                        allSkills ? 
                        allSkills.map(item =>{
                            return(
                                <ListItem key={item} sx={{minWidth:"100px",maxWidth:"20%",float:"left",padding:"0", marginRight:"25px"}}>
                                    <ListItemText>
                                        <Typography sx={{fontSize:"14px"}}>
                                            {item}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            )
                        })
                        : <div></div>
                    }
                    </List>
                </Box>

                <Grid container spacing={5}>

                    <Grid xs={12} sm={12} item>
                        <div {...getRootProps()}>
                            <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                                {value.map((option, index) => (
                                    <StyledTag label={option.title} {...getTagProps({ index })} />
                                ))}

                                <input {...getInputProps()} />
                            </InputWrapper>
                        </div>
                        {groupedOptions.length > 0 ? (
                            <Listbox  {...getListboxProps()}>
                                {groupedOptions.map((option, index) => (
                                    <li {...getOptionProps({ option, index })}>
                                        <span>{option.title}</span>
                                        <CheckIcon fontSize="small" />
                                    </li>
                                ))}
                            </Listbox>
                        ) : null}
                    </Grid>
                    <Grid xs={12} sm={12} item>
                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Root>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const keyPoint = [
    { title: 'HTML'},
    { title: 'CSS'},
    { title: 'BOOTSTRAP'},
    { title: 'JAVASCRIPT'},
    { title: 'REACT'},
    { title: 'REACT NATIVE'},
    { title: 'REDUX'},
    { title: 'REACTSTRAP'},
    { title: 'DJANGO'},
    { title: 'JWT'},
    { title: 'DJANGO REST FRAMEWORK'},
    { title: 'C'},
    { title: 'C++'},
    { title: 'JAVA'},
    { title: 'NODEJS'},
    { title: 'MYSQL'},
    { title: 'PHP'},
    { title: 'LARAVEL'},
];