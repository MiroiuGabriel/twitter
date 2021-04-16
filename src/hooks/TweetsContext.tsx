import React, { createContext, useCallback, useRef, useState } from 'react';
import { TweetPreview } from '../models/TweetPreview';
import { tweetsService } from '../services/tweets.service';

type TweetsContextProps = {
	tweets: TweetPreview[];
	isLoading: boolean;
	deleteTweet: (id: string) => void;
	fetchTweets: () => void;
	createTweet: (message: string, attachment: string) => void;
	toggleLike: (id: string) => void;
};

export const TweetsContext = createContext<TweetsContextProps>({
	tweets: [],
	isLoading: true,
	deleteTweet: (id: string) => {},
	createTweet: (message: string, attachment: string) => {},
	fetchTweets: () => {},
	toggleLike: (id: string) => {},
});

const FETCH_TWEETS_LIMIT = 10;

export const TweetsProvider: React.FC = ({ children }) => {
	const [tweets, setTweets] = useState<TweetPreview[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const offsetRef = useRef(0);

	const createTweet = async (message: string, attachment: string) => {
		setIsLoading(true);

		const response = await tweetsService.createTweet(message, attachment);
		if (response) {
			setTweets(prev => [response, ...prev]);
			offsetRef.current += 1;
		}

		setIsLoading(false);
	};

	const fetchTweets = useCallback(async () => {
		setIsLoading(true);

		const response = await tweetsService.getTweets(
			offsetRef.current,
			FETCH_TWEETS_LIMIT
		);

		setIsLoading(false);

		if (response && response.results.length > 0) {
			setTweets(prev => [...prev, ...response.results]);
			offsetRef.current = offsetRef.current + response.results.length;
		}
	}, []);
	const deleteTweet = async (id: string) => {
		const response = await tweetsService.deleteTweet(id);
		if (response) {
			setTweets(prev => prev.filter(tweet => tweet._id !== response));
		}
	};

	const toggleLike = async (id: string) => {
		const foundTweets = tweets.filter(t => t._id === id);
		if (foundTweets.length > 0) {
			const tweet = foundTweets[0];
			if (tweet.likedByUser) {
				await tweetsService.unlikeTweet(id);
			} else {
				await tweetsService.likeTweet(id);
			}
			setTweets(prev =>
				prev.map(tweet =>
					tweet._id === id
						? {
								...tweet,
								numberOfLikes:
									tweet.numberOfLikes +
									(tweet.likedByUser ? -1 : 1),
								likedByUser: !tweet.likedByUser,
						  }
						: tweet
				)
			);
		}
	};

	return (
		<TweetsContext.Provider
			value={{
				tweets,
				isLoading,
				fetchTweets,
				createTweet,
				deleteTweet,
				toggleLike,
			}}
		>
			{children}
		</TweetsContext.Provider>
	);
};
