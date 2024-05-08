import {Box, Container, Divider, ScrollView} from 'native-base';
import {Charts, Header, Statistic} from './components';
import {AdminLayout, FooterAdmin} from '../../components';

export function DashboardScreen() {
  return (
    <AdminLayout>
      <Box p={4} display="flex" style={{gap: 10}} justifyContent="center">
        <Header />
        <Divider my={4} />
        <Statistic />
        <Divider my={4} />
        <Charts />
      </Box>
    </AdminLayout>
  );
}
