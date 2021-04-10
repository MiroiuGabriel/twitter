import styled from '@emotion/styled/macro';
import { useState } from 'react';
import TwitterSvg from '../../components/icons/TwitterSvg';
import { TwitterInput } from '../../components/input/TwitterInput';
import { Option, TwitterSelect } from '../../components/input/TwitterSelect';
import { useDayOfBirth, Month } from '../../hooks/useDayOfBirth';
import {
	AuthLink,
	Dot,
	ErrorMessage,
	FlexWrapper,
	Form,
	IconWrapper,
	InputWrapper,
	LoginButton,
	Title,
	Wrapper,
} from './Atoms';

const FlexContainer = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding: 1rem 0;
`;

const StyledTwitterSelect = styled(TwitterSelect)`
	margin-right: 0.75rem;
	flex-grow: 1;
	&:first-of-type {
		flex-grow: 2;
	}
	&:last-of-type {
		margin-right: 0;
	}
`;

export const SignupPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const {
		day,
		year,
		month,
		daysInMonth,
		monthsInYear,
		setDay,
		setMonth,
		setYear,
		yearsRange,
	} = useDayOfBirth();
	return (
		<Wrapper>
			<IconWrapper>
				<TwitterSvg
					maxWidth="40px"
					fill="rgb(217, 217, 217)"
				></TwitterSvg>
			</IconWrapper>
			<Title>Sign up for Twitter</Title>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form>
				<InputWrapper>
					<TwitterInput
						label="Username"
						value={username}
						onChange={ev => setUsername(ev.target.value)}
					/>
				</InputWrapper>
				<InputWrapper>
					<TwitterInput
						label="Password"
						type="password"
						value={password}
						onChange={ev => setPassword(ev.target.value)}
					/>
				</InputWrapper>
				<InputWrapper>
					<TwitterInput
						label="Confirm password"
						type="password"
						value={password}
						onChange={ev => setPassword(ev.target.value)}
					/>
				</InputWrapper>
				<FlexContainer>
					<StyledTwitterSelect
						label="Month"
						value={month}
						onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
							setMonth(ev.target.value as Month)
						}
					>
						{monthsInYear.map(month => (
							<Option disabled={!month} key={month}>
								{month}
							</Option>
						))}
					</StyledTwitterSelect>
					<StyledTwitterSelect
						label="Day"
						value={day}
						onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
							setDay(parseInt(ev.target.value))
						}
					>
						{daysInMonth.map(day => (
							<Option disabled={!day} key={day}>
								{day}
							</Option>
						))}
					</StyledTwitterSelect>
					<StyledTwitterSelect
						label="Year"
						value={year}
						onChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
							setYear(parseInt(ev.target.value))
						}
					>
						{yearsRange.map(year => (
							<Option disabled={!year} key={year}>
								{year}
							</Option>
						))}
					</StyledTwitterSelect>
				</FlexContainer>
				<LoginButton type="submit">Sign up</LoginButton>
			</Form>
			<FlexWrapper>
				<AuthLink to="/reset">Forgot password? </AuthLink>
				<Dot>·</Dot>
				<AuthLink to="/login">Log in to Twitter</AuthLink>
			</FlexWrapper>
		</Wrapper>
	);
};
