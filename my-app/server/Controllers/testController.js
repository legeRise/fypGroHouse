export const testController = (req,res) => {
  res.status(200).send({
    message: 'Test Routes',
    succes:true
  });
}