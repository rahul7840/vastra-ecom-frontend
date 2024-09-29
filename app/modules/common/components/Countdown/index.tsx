'use client';
import React, { useState, useEffect, useRef } from 'react';
import './style.scss';

export const Countdown: React.FC = () => {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [timerState, setTimerState] = useState('pomodoro');
	const clockRef = useRef<any>(null);

	useEffect(() => {
		// Initialize FlipClock-like functionality
		if (typeof window !== 'undefined' && (window as any).FlipClock) {
			clockRef.current = new (window as any).FlipClock(
				document.querySelector('.timer'),
				0,
				{
					countdown: true,
					clockFace: 'MinuteCounter',
					autoStart: false,
					callbacks: {
						interval: () => {
							if (clockRef.current.getTime() === 0) {
								if (timerState === 'session') {
									clockRef.current.setTime(breakLength * 60);
									clockRef.current.start();
									setTimerState('break');
								} else if (timerState === 'break') {
									clockRef.current.setTime(sessionLength * 60);
									clockRef.current.start();
									setTimerState('session');
								}
							}
						},
					},
				}
			);
		}
		return () => {
			if (clockRef.current) {
				clockRef.current.stop();
			}
		};
	}, [window]);

	const incrementSession = () => {
		if (sessionLength < 60) {
			setSessionLength((prev) => prev + 1);
		}
	};

	const decrementSession = () => {
		if (sessionLength > 1) {
			setSessionLength((prev) => prev - 1);
		}
	};

	const incrementBreak = () => {
		if (breakLength < 60) {
			setBreakLength((prev) => prev + 1);
		}
	};

	const decrementBreak = () => {
		if (breakLength > 1) {
			setBreakLength((prev) => prev - 1);
		}
	};

	const startTimer = () => {
		if (!isRunning || clockRef.current.getTime() === 0) {
			clockRef.current.setTime(sessionLength * 60);
			setTimerState('session');
		}
		clockRef.current.start();
		setIsRunning(true);
	};

	const stopTimer = () => {
		clockRef.current.stop();
		setIsRunning(false);
	};

	const clearTimer = () => {
		clockRef.current.stop();
		setTimerState('pomodoro');
		clockRef.current.setTime(0);
		setIsRunning(false);
	};

	return (
		<div className='pomodoro'>
			<div className='flex flex-wrap -mx-2'>
				<div className='w-full md:w-1/2 px-2'>
					<div className='text-center'>
						<p>session length</p>
					</div>
					<div className='flex justify-center items-center'>
						<div className='flex-1 text-center'>
							<button
								className='btn bg-gray-800 text-gray-300'
								id='sessDec'
								onClick={decrementSession}
							>
								-
							</button>
						</div>
						<div className='flex-1 text-center'>
							<div id='session'>{sessionLength}</div>
						</div>
						<div className='flex-1 text-center'>
							<button
								className='btn bg-gray-800 text-gray-300'
								id='sessInc'
								onClick={incrementSession}
							>
								+
							</button>
						</div>
					</div>
				</div>
				<div className='w-full md:w-1/2 px-2'>
					<div className='text-center'>
						<p>break length</p>
					</div>
					<div className='flex justify-center items-center'>
						<div className='flex-1 text-center'>
							<button
								className='btn bg-gray-800 text-gray-300'
								id='breakDec'
								onClick={decrementBreak}
							>
								-
							</button>
						</div>
						<div className='flex-1 text-center'>
							<div id='break'>{breakLength}</div>
						</div>
						<div className='flex-1 text-center'>
							<button
								className='btn bg-gray-800 text-gray-300'
								id='breakInc'
								onClick={incrementBreak}
							>
								+
							</button>
						</div>
					</div>
				</div>
			</div>

			<div id='clock' className='mt-8'>
				<div className='timer'>
					<div className='middle'></div>
				</div>
			</div>
			<div className='flex justify-center mt-5' id='statRow'>
				<div
					id='stats'
					className='bg-gray-800 text-gray-300 w-56 h-16 rounded-lg text-4xl flex items-center justify-center'
				>
					{timerState}
				</div>
			</div>
			<div className='container mx-auto'>
				<div className='flex justify-center mt-5' id='btns'>
					<button
						className='btn bg-gray-800 text-gray-300 text-lg px-4 py-2'
						id='start'
						onClick={startTimer}
					>
						start
					</button>
					<button
						className='btn bg-gray-800 text-gray-300 text-lg px-4 py-2 mx-2'
						id='stop'
						onClick={stopTimer}
					>
						stop
					</button>
					<button
						className='btn bg-gray-800 text-gray-300 text-lg px-4 py-2'
						id='clear'
						onClick={clearTimer}
					>
						clear
					</button>
				</div>
			</div>
		</div>
	);
};
