import { generateDtsBundle } from 'dts-bundle-generator';
import { join } from 'path';
const bundlerConfig = [{
    filePath: join(process.cwd(), 'src/exposes/Hello/index.tsx'),
    "libraries": {
    },
    noCheck: true,
    output: {
        noBanner: true
    }
}];
const generatedDts = generateDtsBundle(bundlerConfig, {
    preferredConfigPath: join(
        process.cwd(), 'tsconfig.json'
    )
})
console.log(generatedDts)