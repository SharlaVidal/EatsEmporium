import { Button, Box, Typography, AppBar, Container, Toolbar, Paper, Link } from "@mui/material";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";


const PaginaBaseAdmin =  ({ basePath }: { basePath: string }) => {
    const location = useLocation();

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to={`${basePath}/restaurantes`}>
                                <Button sx={{ my: 2, color: 'white' }} variant={location.pathname.startsWith(`${basePath}/restaurantes`) ? 'contained' : 'text'}>
                                    Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={`${basePath}/restaurantes/novo`}>
                                <Button sx={{ my: 2, color: 'white' }} variant={location.pathname.startsWith(`${basePath}/restaurantes/novo`) ? 'contained' : 'text'}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to={`${basePath}/pratos`}>
                                <Button sx={{ my: 2, color: 'white' }} variant={location.pathname.startsWith(`${basePath}/pratos`) ? 'contained' : 'text'}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Home
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                      <Outlet/>
                    </Paper>
                </Container>
            </Box>
        </>
    )
};

export default PaginaBaseAdmin;
