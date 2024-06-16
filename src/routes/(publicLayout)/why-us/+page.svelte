<script>
	import Header from '$lib/Components/Header.svelte';
	import WhyUsFaq from '$lib/Components/WhyUsFAQ.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-RPPt4xk-X3-1500x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				WHY <span class=" text-primary">FITNESS ACADEMY</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full py-16 lg:py-32">
	<div class="hms-container">
		<div class="w-full">
			<p class="text-lg">
				We know you have lots of choices when it comes to fitness options in a coaching team and
				gym. But here’s why we believe we have pioneered a new way of training which delivers better
				results for our members.
			</p>

			<div class="mt-16 w-full">
				<WhyUsFaq />
			</div>
		</div>
	</div>
</section>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<h2
			class="relative mb-8 flex justify-center pb-8 text-3xl font-black after:absolute after:bottom-0 after:block after:h-[10px] after:w-[70px] after:bg-primary md:text-4xl lg:text-5xl"
		>
			Our Core Values
		</h2>
		<div class="w-full">
			<ol class=" list-decimal marker:text-3xl marker:font-black marker:text-primary">
				<li>
					<h3 class=" mb-2 text-xl font-black uppercase text-primary md:text-2xl lg:text-3xl">
						“WE before Me”
					</h3>
					<p class="text-lg md:text-xl lg:text-2xl">
						FITNESS ACADEMY is a team effort. We operate in a transparent, professional, but also
						high energy and fun environment where everyone has a voice that matters. We are selfless
						in our approach. We invest in our team members so that we can fully invest in our
						clients.
					</p>
				</li>
				<li class="mt-4">
					<h3 class=" mb-2 text-xl font-black uppercase text-primary md:text-2xl lg:text-3xl">
						Unparalleled Dedication
					</h3>
					<p class="text-lg md:text-xl lg:text-2xl">
						Every day is game day at FITNESS ACADEMY. We are on time, focused, efficient, and
						energized for every client, every day.
					</p>
				</li>

				<li class="mt-4">
					<h3 class=" mb-2 text-xl font-black uppercase text-primary md:text-2xl lg:text-3xl">
						Proactive
					</h3>
					<p class="text-lg md:text-xl lg:text-2xl">
						We practice what we preach. We do our own workouts in order to experience what the
						clients are going through. We push and encourage members to progress so that they can
						see results.
					</p>
				</li>

				<li class="mt-4">
					<h3 class=" mb-2 text-xl font-black uppercase text-primary md:text-2xl lg:text-3xl">
						Passionate
					</h3>
					<p class="text-lg md:text-xl lg:text-2xl">
						We are not just another gym. We are a supportive community for our clients with the same
						long-term goal for everyone: “live life to the fullest.” We believe in our services and
						want for our clients what we want for ourselves.
					</p>
				</li>

				<li class="mt-4">
					<h3 class=" mb-2 text-xl font-black uppercase text-primary md:text-2xl lg:text-3xl">
						Evolving
					</h3>
					<p class="text-lg md:text-xl lg:text-2xl">
						We yearn to learn. This means constantly improving ourselves, our services, and the
						lives of our clients. We never remain static, knowing all too well that training and
						performance is a dynamic industry. We stay on top of new research, trends and science.
						We embrace change and will always drive towards excellence.
					</p>
				</li>
			</ol>
		</div>

		<div class=" mt-16">
			<a href="/blog" class="btn btn-accent btn-block max-w-[120px] text-xl font-[600]">BACK</a>
		</div>
	</div>
</section>
