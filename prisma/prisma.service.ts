import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Optional: gracefully shutdown Prisma when app is closed
  async enableShutdownHooks() {
    this.$on('beforeExit' as never,async () => {
      await this.$disconnect();
    });
  }
}
