const router = require('express').Router();

const { CompanyController } = require('../controllers');
const { parseFormData, validate } = require('../helpers/middlewares');
const { CompanyDto } = require('../dtos');

router.post(
	'/my-company/edit',
	parseFormData,
	validate(CompanyDto.profile),
	CompanyController.update
);
// router.get('/my-company', CompanyController.get, (req, res) => {
// 	res.json('hre');
// });
// router.get('/:meta', CompanyController.get);

module.exports = router;
