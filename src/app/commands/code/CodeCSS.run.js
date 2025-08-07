
const run = async ({value, $id}) => {
  const id = 'css-' + $id;
  const style = document.body.querySelector('#' + id) ||
    document.createElement('style');

  style.innerHTML = value;
  style.id = id
  document.body.append(style)
}

export default run
