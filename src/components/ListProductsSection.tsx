import { FC, useState, useEffect } from "react"

import {
	Container,
	Grid,
	Typography,
	Divider,
	Fab,
	Hidden,
	useMediaQuery,
	Button,
} from "@material-ui/core"

import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles"

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"

import Pagination from "@material-ui/lab/Pagination"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import selectCategory from "../redux/actions/categoriesAction"

import { ProductCardProps } from "../misc/types"

import ProductCard from "./ProductCard"
import ShowProduct from "./ShowProduct"
import Categories from "./Categories"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		galeryContainer: {
			position: "relative",
			minHeight: "50vh",
			paddingLeft: 30,
			paddingRight: 30,
		},
		bgRed: {
			minHeight: 50,
			display: "flex",
			poaition: "relative",
			width: "100%",
		},
		bgLow: {
			position: "absolute",
			top: 0,
			left: "2.5%",
			width: "95%",
			height: "50vh",
			transition: "1s",
			background: "linear-gradient(35deg, #fb6340 0, #fbb140 100%)",
			borderRadius: 35,
			zIndex: -1,
		},
		bgHigh: {
			position: "absolute",
			top: 0,
			left: "2.5%",
			width: "95%",
			height: "40%",
			transition: "1s",
			background: "linear-gradient(35deg, #fb6340 0, #fbb140 100%)",
			borderRadius: 35,
			zIndex: -1,

			[theme.breakpoints.down("sm")]: {
				height: "75%",
			},
		},
		textCenter: {
			textAlign: "center",
			alignItems: "center",
			padding: 25,
			[theme.breakpoints.down("sm")]: {
				padding: 10,
			},
		},
		menuBtn: {
			color: "white",
			borderColor: "white",
			borderRadius: 7,
		},
		productList: {
			paddingLeft: 10,
			paddingRight: 10,

			[theme.breakpoints.down("sm")]: {
				height: "auto",
				overflowX: "scroll",
				display: "flex",
				marginTop: 5,
				paddingLeft: 0,
				flexWrap: "unset",
				justifyContent: "space-between",
				paddingRight: 0,
				boxShadow: "inset 0 0 10px #000000",
				borderRadius: 8,
			},
		},
		pagination: {
			marginBottom: "3rem",
		},
		scrollBtn: {
			boxShadow: "none",
		},
		showProduct: {
			minHeight: "70vh",
		},
		dNone: {
			visibility: "hidden",
			opacity: 0,
			transition: "visibility 0s, opacity 1s linear",
		},
		dBlock: {
			visibility: "visible",
			opacity: 1,
			transition: "visibility 0s, opacity 1s linear",
		},
		notFound: {
			textAlign: "center",
			color: "white",
			paddingTop: "13vh",
			paddingBottom: "13vh",
		},
	})
)

const placeholder = [
	{
		id: 0,
		title: "",
		description: "",
		price: 0,
		stock: 0,
		images: [],
		brand: "",
		type: "",
		discount: null,
	},
]

const ListProductsSection: FC<Props> = ({ alt }) => {
	const { product } = useSelector((state: RootState) => state.product)
	const { category } = useSelector((state: RootState) => state.category)

	const dispatch = useDispatch()

	const theme = useTheme()

	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const classes = useStyles()

	const [loading, setLoading] = useState(true)

	const [products, setProducts] = useState<ProductCardProps[]>(placeholder)

	const [totalPages, setTotalPages] = useState(1)

	const [totalResults, setTotalResults] = useState(0)

	const [fromResult, setFromResult] = useState(1)

	const [toResult, setToResult] = useState(10)

	useEffect(() => {
		getProductsFromApi("?page=1")
	}, [category])

	const getProductsFromApi = async (urlParams: string) => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL

		if (apiUrl) {
			fetch(apiUrl + "/get-products" + category + urlParams, {
				headers: {
					Accept: "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setProducts(data.products.data)

					setTotalPages(data.products.last_page)

					setTotalResults(data.products.total)

					setToResult(data.products.to)

					setFromResult(data.products.from)

					setLoading(false)
				})
				.catch((e) => {
					console.log(e)
				})
		}
	}

	const handlePageChange = async (event: object, page: number) => {
		const productsContainer = document.getElementById("products-list")

		const productsSection = document.getElementById("productos")

		if (productsContainer && smallScreen) {
			productsContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" })
		}

		if (productsSection && !smallScreen) {
			productsSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}

		setTimeout(() => {
			setLoading(true)
			setProducts(placeholder)

			getProductsFromApi("?page=" + page)
		}, 1000)
	}

	const scrollProducts = () => {
		const productsContainer = document.getElementById("products-list")
		const elWidth = document.getElementById("producto-0")

		if (productsContainer && elWidth) {
			productsContainer.scrollBy({
				top: 0,
				left: +elWidth.offsetWidth,
				behavior: "smooth",
			})
		}
	}

	const handleClick = (selectedCategory: string) => {
		if (!category && selectedCategory === "") {
			console.log({ category, selectedCategory })
			return
		}

		const productsSection = document.getElementById("productos")

		if (productsSection) {
			productsSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}

		setTimeout(() => {
			setLoading(true)
			setProducts(placeholder)

			dispatch(selectCategory(selectedCategory))
		}, 1000)
	}

	return (
		<>
			{!alt && <Categories onClick={handleClick} />}

			<div style={{ paddingTop: "5rem" }} id="productos">
				<Container maxWidth="lg" className={classes.galeryContainer}>
					<div className={!product ? classes.bgLow : classes.bgHigh} />

					<Grid
						item
						xs={12}
						style={{
							visibility: product ? "visible" : "hidden",
							opacity: product ? 1 : 0,
							transition: "1.5s",
						}}
					>
						<ShowProduct />
					</Grid>

					<Grid container justify="center" spacing={4}>
						<Grid item className={classes.bgRed}>
							<Grid container justify="space-around">
								<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
									<Button
										variant="outlined"
										color="inherit"
										className={classes.menuBtn}
										onClick={() => handleClick("")}
									>
										Ver Todos Los Productos
									</Button>
								</Grid>
								<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
									<Typography variant="h6">Nuestros Productos</Typography>
									<Divider />
								</Grid>
								<Grid item xs={12} sm={12} md={4} className={classes.textCenter}>
									<Typography variant="subtitle2">
										Mostrando {fromResult} - {toResult} de {totalResults}{" "}
										Resultados
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<Grid
										container
										justify="space-around"
										spacing={4}
										className={classes.productList}
										id="products-list"
									>
										{products.length >= 1 ? (
											products.map((product, index) => (
												<Grid
													item
													xs={12}
													sm={6}
													md={4}
													lg={3}
													key={index}
													id={"producto-" + index}
												>
													<ProductCard
														productFromProps={product}
														loading={loading}
													/>
												</Grid>
											))
										) : (
											<Grid item xs={12}>
												<Typography
													variant="h5"
													className={classes.notFound}
												>
													No se encontró ningún producto en esa
													categoría...
												</Typography>
											</Grid>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						<Hidden mdUp>
							<Grid item xs={12} className={classes.textCenter}>
								<Fab
									color="primary"
									aria-label="scroll"
									size="small"
									className={classes.scrollBtn}
									onClick={scrollProducts}
								>
									<ArrowRightAltIcon />
								</Fab>
							</Grid>
						</Hidden>

						<Grid item className={classes.pagination}>
							<Pagination
								count={totalPages}
								color="primary"
								onChange={handlePageChange}
								size="small"
							/>
						</Grid>
					</Grid>
				</Container>
			</div>

			{alt && <Categories onClick={handleClick} />}
		</>
	)
}

export default ListProductsSection

interface Props {
	alt?: boolean
}
