import { defineConfig } from 'umi'
import routes from './routes'

export default defineConfig({
  framework: 'react',
  base: '/umi-plugin',
  routes,
  title: 'React模板',
  theme: {
    '@red': 'red'
  },
  fastRefresh: true,
  mfsu: false,
  writeToDisk: true,
  chainWebpack(memo, args) {
    memo.mode('development')
    return memo;
  },
})
