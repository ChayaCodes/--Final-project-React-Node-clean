import React, { useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useGetMeQuery, useEditMeMutation } from '../../../features/me/meApiSlice';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useLoginMutation, useLogoutMutation } from '../../../features/auth/authApiSlice';

const EditPersonalDetails = () => {
    const { data: user, isSucces: isGetMeSuccess } = useGetMeQuery();
    const [editMe, { isSuccess: isEditMeSuccess, isError: isEditMeError, error: editMeError, isLoading: isLoadingEditMe }] = useEditMeMutation();
    const [userData, setUserData] = useState();
    const [login, { isError: isLoginError, error: loginError }] = useLoginMutation();
    const [logout, { isError: isLogoutError, error: logoutError }] = useLogoutMutation();
    useEffect(() => {
        if (isGetMeSuccess) {
            setUserData(user);
        }
    }, [isGetMeSuccess]);

    const handleEditMe = async () => {
        const { userName: newUserName } = await editMe(userData);
    }
    useEffect(() => {
        if (isEditMeSuccess) {
            console.log("edit sucses")
            logout();
            const password = userData.newPassword ? userData.newPassword : userData.password;
            console.log("login:", { userName: userData.userName, password: password });
            login({ userName: userData.userName, password: password });
        }
        if (isEditMeError) {
            console.log("edit error", editMeError);
        }
    }, [isEditMeSuccess, logout, login, userData]);

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off">
                <Typography variant="h5" align="center" gutterBottom>
                    עריכת פרטים אישיים
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={userData?.firstName || ''}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            fullWidth
                            id="firstName"
                            label="שם פרטי"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            label="שם משפחה"
                            variant="outlined"
                            value={userData?.lastName || ''}
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="username"
                            label="שם משתמש"
                            variant="outlined"
                            value={userData?.userName || ''}
                            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="email"
                            label="כתובת אימייל"
                            variant="outlined"
                            value={userData?.email || ''}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" align="left" gutterBottom>
                            שינוי סיסמא
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            id="password"
                            label="סיסמא נוכחית"
                            variant="outlined"
                            required
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            id="confirmPassword"
                            label="סיסמא חדשה (במידה ולא תרצה/י לשנות יש להשאיר ריק)"
                            variant="outlined"
                            onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="comments"
                            label="יש לאשר את הסיסמא החדשה"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='error' style={{ color: 'red' }}>
                            {isEditMeError && editMeError.message}
                            {isLoginError && loginError.message}
                            {isLogoutError && logoutError.message}
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleEditMe}
                        >
                            {
                                isLoadingEditMe ? <span><CircularProgress size={20} /> מעדכן</span> : 'שמירת שינויים'
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default EditPersonalDetails;
