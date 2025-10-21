import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'antd';
import Home from './pages/Home';
import Detail from './pages/Detail';

const { Header, Content } = Layout;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout className="min-h-screen bg-black-bg">
          <Header className="bg-black-bg border-b border-emerald-dark/20 sticky top-0 z-50 fade-in">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
              <h1 className="text-3xl font-bold text-emerald-green">TV Emerald</h1>
            </div>
          </Header>
          <Content className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<Detail />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;