export interface HelloProps {
  name: string;
}
const Hello: React.FC<HelloProps> = (props) => {
  return <div>MF Hello World</div>;
};
export default Hello;