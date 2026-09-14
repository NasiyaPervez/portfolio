---
title: "The Newsvendor Problem, Explained with a Coffee Shop"
description: "A gentle introduction to the Newsvendor Problem, the classic Operations Research model behind every \"how much should I stock?\" decision, explained through a simple coffee shop scenario."
pubDate: 2026-09-14
tags: ["operations research", "inventory", "optimization"]
image: "/images/bakery.jpg"
draft: false
---

## Introduction

Picture a small coffee shop that bakes fresh croissants every morning. Bake too few, and by 9am there's a line of disappointed regulars and a missed sale. Bake too many, and by closing time there's a tray of stale pastries headed for the bin. The owner doesn't know exactly how many people will walk in that day, demand is uncertain, but they still have to commit to a number before the doors open.

This everyday dilemma is, almost word for word, one of the oldest and most elegant problems in Operations Research: the Newsvendor Problem. It gets its name from a street newspaper vendor who has to decide how many papers to buy each morning, before knowing how many will actually sell. The same logic shows up everywhere, fashion retailers ordering seasonal inventory, hospitals stocking perishable blood products, event planners ordering catering, and yes, coffee shops baking croissants.

What makes the Newsvendor Problem such a great entry point into OR is that it's genuinely simple to state, has a clean and intuitive solution, and yet captures something deep: the mathematics of decision-making under uncertainty. Let's walk through it.

## The Core Tension: Two Ways to Be Wrong

Every morning, the coffee shop owner has to pick a number of croissants to bake, before knowing how many customers will show up. Whatever number they pick, there are exactly two ways things can go wrong:

- **They bake too few.** Every customer who wanted a croissant but couldn't get one represents a lost sale, and possibly a little bit of lost goodwill if they walk out empty-handed.
- **They bake too many.** Every unsold croissant at the end of the day is wasted ingredients, wasted labor, and (since croissants don't keep) zero salvage value.

Notice the asymmetry: running out and overstocking aren't equally bad. Understocking costs you the profit margin on a sale you could have made. Overstocking costs you the cost of the ingredients and labor you already sank into a croissant nobody bought. These are two different numbers, and the entire Newsvendor Problem is really about balancing them.

Economists give these two costs names:

- **Cost of underage (C_u):** the profit lost for every unit of demand you fail to meet.
- **Cost of overage (C_o):** the cost lost for every unit you produce but don't sell.

If croissants sell for $4 and cost $1.50 to make, then C_u = $2.50 (the margin you miss out on) and C_o = $1.50 (the cost you eat on leftovers).

## Why "Just Bake the Average" Doesn't Work

A natural instinct is to bake the average number of croissants sold historically, say, 80 a day. It feels safe and reasonable. But it's actually not the right answer, and the reason why is worth sitting with.

If the owner bakes exactly the average demand, they will sell out on roughly half of all days (whenever demand happens to be above average) and have leftovers on the other half (whenever demand is below average). Whether that's a good outcome depends entirely on how the two types of error compare in cost. If a missed sale is much more painful than a wasted croissant, it makes sense to lean toward baking more than the average, accepting more waste in exchange for fewer stockouts. If wasted croissants are the bigger concern, the opposite is true.

In other words, the right quantity isn't about matching demand on average, it's about balancing the cost of the two possible mistakes. That balancing act is exactly what the Newsvendor model solves.

## The Critical Ratio: A Surprisingly Simple Answer

Here's the elegant part. Given the cost of underage (C_u) and the cost of overage (C_o), the optimal service level, the probability that you have enough croissants to meet demand on any given day, is given by a strikingly simple formula:

```
Critical Ratio = C_u / (C_u + C_o)
              = 2.50 / (2.50 + 1.50)
              = 2.50 / 4.00
              = 0.625
```

This is often called the critical fractile or critical ratio, and it tells you exactly what percentile of the demand distribution you should be targeting when you decide how much to stock.

That means the owner should bake enough croissants to satisfy demand on 62.5% of days, accepting that on the other 37.5% of days, they'll sell out. Why not aim for 100%? Because chasing zero stockouts means baking for the busiest day imaginable, and the extra waste on every normal day would cost more than the occasional missed sale is worth. The critical ratio finds the sweet spot where the marginal cost of stocking one more unit exactly equals the marginal benefit of doing so.

This single number, the critical ratio, is the heart of the Newsvendor Problem. Everything else is about translating it into an actual order quantity.

## From Ratio to Real Numbers: Bringing In Demand Data

The critical ratio tells you what percentile of demand to target, but you still need to know what that percentile actually looks like in terms of croissants. That's where historical demand data comes in.

Suppose the owner has been tracking daily croissant sales for months, and demand looks roughly bell-shaped (a normal distribution) with an average of 80 croissants and a standard deviation of 15. To find the 62.5th percentile of that distribution, you'd look up the corresponding z-score (about 0.32 for the 62.5th percentile) and compute:

```
Q* = μ + z·σ = 80 + (0.32 × 15) ≈ 85
```

So the optimal baking quantity is roughly 85 croissants a day, a bit above the historical average of 80, because the cost of a missed sale outweighs the cost of a leftover pastry in this scenario. If the margins were reversed, say croissants were expensive to make and only modestly profitable, the optimal quantity might land below the average instead.

This is the general recipe of the Newsvendor model:

1. Estimate the cost of underage and the cost of overage.
2. Compute the critical ratio.
3. Find the demand percentile that matches that ratio.
4. Order (or produce) that quantity.

## Why This Problem Matters Beyond Croissants

It's tempting to see this as a cute toy example, but the Newsvendor logic quietly governs a huge amount of real-world decision-making:

- **Fashion retail:** A clothing brand deciding how many units of a seasonal jacket to manufacture faces the exact same tradeoff, unsold jackets get marked down or scrapped, while stockouts mean lost sales to a competitor.
- **Healthcare:** Blood banks and pharmacies stocking perishable products balance the cost of shortages (patient harm, emergency sourcing) against the cost of expired inventory.
- **Events and catering:** Ordering food for a wedding or conference is a one-shot decision made well before the actual headcount is known.
- **Digital capacity planning:** Even something like provisioning cloud server capacity for a product launch has newsvendor-like characteristics, overprovisioning wastes money, underprovisioning costs reliability.

In every one of these cases, the underlying structure is identical: a single decision made under uncertain demand, with asymmetric costs for guessing too high versus too low. Once you see the pattern, it's hard to unsee it.

## What Makes This a Good Starting Point for OR

I find the Newsvendor Problem to be one of the best "gateway" models into Operations Research, for a few reasons:

- **It's intuitive.** Almost everyone has experienced the frustration of a sold-out item or the disappointment of watching food go to waste, so the tradeoff needs no special explanation.
- **It has a closed-form solution.** Unlike many OR problems that require heavy computation or heuristics to solve, the Newsvendor model gives you an exact answer from a simple formula, a rare and satisfying property in this field.
- **It reveals a bigger idea.** The notion that "optimal" doesn't mean "matching the average" but rather "balancing marginal costs" is a concept that echoes throughout inventory theory, revenue management, and beyond.
- **It's extensible.** Real-world versions add complications, multiple products, correlated demand, lead times, discounts for overstock, but they all build on this same critical-ratio foundation.

## Conclusion

The next time you see a coffee shop with a half-empty pastry case at 4pm, or notice they've sold out of your favorite muffin by 10am, you're watching the Newsvendor Problem play out in real time. Behind that simple daily decision, how many to bake, is a genuinely elegant piece of mathematics: balance the cost of running out against the cost of leftovers, and let that ratio tell you exactly how much risk of a stockout is worth accepting.

It's a small example, but it captures something that shows up throughout Operations Research: good decisions under uncertainty aren't about eliminating risk entirely, they're about understanding exactly how much risk is worth taking, and why.