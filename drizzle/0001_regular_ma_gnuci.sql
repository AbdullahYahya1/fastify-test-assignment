ALTER TABLE `users` ADD `refresh_token` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_refresh_token_unique` UNIQUE(`refresh_token`);