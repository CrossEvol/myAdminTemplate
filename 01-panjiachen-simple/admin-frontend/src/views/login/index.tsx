import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
  OutlinedInput,
  Divider,
  Typography,
  Button
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import userApi from '../../api/userApi'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '@/store/services/userSlice'
import { useNavigate } from 'react-router-dom'

const Title = styled.div`
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  margin: 15px 0;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`

interface LoginUser {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [loginUser, setLoginUser] = useState<LoginUser>({
    username: '',
    password: ''
  })

  const handleUserInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginUser({ ...loginUser, username: e.target.value.trim() })
  }

  const handlePwdInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginUser({ ...loginUser, password: e.target.value.trim() })
  }

  const handleLogin = async () => {
    const res = await userApi.reqLogin(loginUser.username, loginUser.password)
    console.log(res.data)
    dispatch(setCurrentUser(res.data.data))
    setTimeout(() => navigate('/', { replace: false }), 2000)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: '#2d3a4b',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center'
          }}
        >
          <Title>Login Form</Title>
          <LoginForm>
            <FormControl variant="standard">
              <OutlinedInput
                value={loginUser.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleUserInputValueChange(e)
                }}
                sx={{
                  width: '500px',
                  backgroundColor: '#446489',
                  margin: '10px'
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <OutlinedInput
                value={loginUser.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlePwdInputValueChange(e)
                }
                type={showPwd ? 'text' : 'password'}
                sx={{
                  width: '500px',
                  backgroundColor: '#446489',
                  margin: '10px'
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <Divider
                      orientation="vertical"
                      sx={{
                        backgroundColor: '#0e102a',
                        height: 20,
                        marginRight: '1px'
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowPwd(!showPwd)}
                    >
                      {showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </div>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <Button
                onClick={handleLogin}
                variant="contained"
                size="large"
                sx={{ width: 500, margin: '10px' }}
              >
                Login
              </Button>
            </FormControl>
          </LoginForm>
          <Typography
            variant="h6"
            display="block"
            gutterBottom
            sx={{ textAlign: 'center', color: '#fff' }}
          >
            username: admin password: any
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}
