import styled from 'styled-components'

export const SearchDiv = styled.div`
	background-color: white;
	border: solid black 1px;
	margin-left: 2%
	padding: 2%;
	@media (max-width: 1375px){
		margin-left: 0;
	}
	> h2 {
		font-size: 2rem;
		margin-bottom: 10px;
		text-align: center;
	}
	> div > div {
		padding: 2%;
		margin: 10px 1%;
	}
	> div > div > h3 {
		font-size: 1.6rem;
		margin-top: 15px;
	}
`

export const FlexDiv = styled.div`
	display:flex;
	flex-wrap: wrap;
	width: 100%;
  max-width: 800px;
  margin: 0 auto;
`
